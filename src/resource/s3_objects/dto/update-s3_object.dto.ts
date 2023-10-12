import { PartialType } from '@nestjs/mapped-types';
import { CreateS3ObjectDto } from './create-s3_object.dto';

export class UpdateS3ObjectDto extends PartialType(CreateS3ObjectDto) {}
