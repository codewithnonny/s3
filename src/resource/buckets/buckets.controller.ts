import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';
import { BucketsService } from './buckets.service';
import { CreateBucketDto } from './dto/create-bucket.dto';
import { UpdateBucketDto } from './dto/update-bucket.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User, UserFromRequest } from 'src/decorators/user.decorator';
import { UsersService } from '../users/users.service';

@Controller('buckets')
@UseGuards(JwtAuthGuard)
export class BucketsController {
  constructor(
    private readonly bucketsService: BucketsService,
    private readonly userService: UsersService,
  ) {}

  @Post('create')
  async create(
    @Body() createBucketDto: CreateBucketDto,
    @User() userFromRequest: UserFromRequest,
  ) {
    const user = await this.userService.findOne(userFromRequest.id);

    if (!user) throw new BadRequestException('user not found');

    Object.assign(createBucketDto, { user });

    return this.bucketsService.create(createBucketDto);
  }

  @Get('')
  async getAllUserBuckets(@User() userFromRequest: UserFromRequest) {
    const user = await this.userService.findOne(userFromRequest.id);

    if (!user) throw new BadRequestException('user not found');

    return this.bucketsService.getAllUserBucket(user);
  }

  @Get(':id')
  async getBucketDetailsById(@Param('id', ParseIntPipe) id: number) {
    return this.bucketsService.getBucketDetailsById(id);
  }
}
