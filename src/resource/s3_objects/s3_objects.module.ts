import { Module } from '@nestjs/common';
import { S3ObjectsService } from './s3_objects.service';
import { S3ObjectsController } from './s3_objects.controller';
import { BucketsModule } from '../buckets/buckets.module';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Object } from './entities/s3_object.entity';

@Module({
  imports: [TypeOrmModule.forFeature([S3Object]), BucketsModule, UsersModule],
  controllers: [S3ObjectsController],
  providers: [S3ObjectsService],
})
export class S3ObjectsModule {}
