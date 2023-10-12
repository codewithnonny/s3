import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateS3ObjectDto } from './dto/create-s3_object.dto';
import { UpdateS3ObjectDto } from './dto/update-s3_object.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { S3Object } from './entities/s3_object.entity';
import { Repository } from 'typeorm';
import { Bucket } from '../buckets/entities/bucket.entity';

@Injectable()
export class S3ObjectsService {
  constructor(
    @InjectRepository(S3Object)
    private readonly s3ObjectRepository: Repository<S3Object>,
  ) {}

  async create(createS3ObjectDto: CreateS3ObjectDto) {
    const s3ObjectData = {
      bucket: createS3ObjectDto.bucket,
      fileId: createS3ObjectDto.file.filename,
    };

    const s3Object = await this.s3ObjectRepository.save(s3ObjectData);

    return s3Object;
  }

  async getBucketAllObject(bucket: Bucket) {
    const s3Objects = await this.s3ObjectRepository.find({
      where: { bucket: { id: bucket.id } },
    });

    return s3Objects;
  }

  async getS3ObjectById(id: number) {
    const s3Object = await this.s3ObjectRepository.findOne({
      relations: { bucket: true },
      where: { id },
    });

    if (!s3Object) throw new NotFoundException('invalid object id');

    return s3Object;
  }

  async updateObjectById(s3Object: S3Object, file: Express.Multer.File) {
    Object.assign(s3Object, { fileId: file.filename });

    const updatedS3Object = await this.s3ObjectRepository.save(s3Object);

    return updatedS3Object;
  }

  async deleteObjectById(id: number) {
    return this.s3ObjectRepository.delete({ id });
  }
}
