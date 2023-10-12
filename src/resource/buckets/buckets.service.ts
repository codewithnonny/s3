import { Injectable } from '@nestjs/common';
import { CreateBucketDto } from './dto/create-bucket.dto';
import { UpdateBucketDto } from './dto/update-bucket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bucket } from './entities/bucket.entity';
import { FindOptionsRelations, Repository } from 'typeorm';
import { UserFromRequest } from 'src/decorators/user.decorator';
import { User } from '../users/entities/user.entity';

@Injectable()
export class BucketsService {
  constructor(
    @InjectRepository(Bucket)
    private readonly bucketRepository: Repository<Bucket>,
  ) {}

  async create(createBucketDto: CreateBucketDto) {
    const bucket = await this.bucketRepository.save(createBucketDto);
    return bucket;
  }

  async getAllUserBucket(user: User) {
    const buckets = await this.bucketRepository.find({
      where: { user: { id: user.id } },
    });

    return buckets;
  }

  async getBucketDetailsById(id: number) {
    const bucketDetails = await this.bucketRepository.findOne({
      relations: { objects: true },
      where: { id },
    });

    return bucketDetails;
  }

  async getBucketWithRelation(
    relation: FindOptionsRelations<Bucket>,
    id: number,
  ) {
    return this.bucketRepository.findOne({
      relations: relation,
      where: { id },
    });
  }
}
