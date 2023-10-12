import { Bucket } from 'src/resource/buckets/entities/bucket.entity';

export class CreateS3ObjectDto {
  file: Express.Multer.File;

  bucket: Bucket;
}
