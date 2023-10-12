import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  ParseIntPipe,
  BadRequestException,
  ForbiddenException,
  Response,
} from '@nestjs/common';
import { S3ObjectsService } from './s3_objects.service';
import { CreateS3ObjectDto } from './dto/create-s3_object.dto';
import { UpdateS3ObjectDto } from './dto/update-s3_object.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User, UserFromRequest } from 'src/decorators/user.decorator';
import { UsersService } from '../users/users.service';
import { BucketsService } from '../buckets/buckets.service';

@Controller('object')
@UseGuards(JwtAuthGuard)
export class S3ObjectsController {
  constructor(
    private readonly s3ObjectsService: S3ObjectsService,
    private readonly userService: UsersService,
    private readonly bucketService: BucketsService,
  ) {}

  async authorizeUserBucket(
    userFromRequest: UserFromRequest,
    bucketId: number,
  ) {
    const user = await this.userService.findOne(userFromRequest.id);

    const bucket = await this.bucketService.getBucketWithRelation(
      { user: true },
      bucketId,
    );

    if (!bucket) throw new BadRequestException('invalid bucket id');

    if (user.id != bucket.user.id)
      throw new ForbiddenException('you are allowed to perform this action');

    return bucket;
  }

  @Post('upload/:bucketId')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async create(
    @Param('bucketId', ParseIntPipe) bucketId: number,
    @UploadedFile('file') file: Express.Multer.File,
    @User() userFromRequest: UserFromRequest,
    @Body() createS3ObjectDto: CreateS3ObjectDto,
  ) {
    if (!file) throw new BadRequestException('select a file');

    const bucket = await this.authorizeUserBucket(userFromRequest, bucketId);

    Object.assign(createS3ObjectDto, { bucket, file });

    return this.s3ObjectsService.create(createS3ObjectDto);
  }

  @Get('list/:bucketId')
  async getBucketAllObject(
    @Param('bucketId', ParseIntPipe) bucketId: number,
    @User() userFromRequest: UserFromRequest,
  ) {
    const bucket = await this.authorizeUserBucket(userFromRequest, bucketId);

    return this.s3ObjectsService.getBucketAllObject(bucket);
  }

  @Get(':id')
  async getObjectById(
    @Param('id', ParseIntPipe) id: number,
    @User() userFromRequest: UserFromRequest,
    @Response() res: any,
  ) {
    const s3Object = await this.s3ObjectsService.getS3ObjectById(id);

    await this.authorizeUserBucket(userFromRequest, s3Object.bucket.id);

    return res.sendFile(s3Object.fileId, { root: './src/upload' });
  }
}
