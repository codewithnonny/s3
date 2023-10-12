import { Test, TestingModule } from '@nestjs/testing';
import { S3ObjectsService } from './s3_objects.service';

describe('S3ObjectsService', () => {
  let service: S3ObjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [S3ObjectsService],
    }).compile();

    service = module.get<S3ObjectsService>(S3ObjectsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
