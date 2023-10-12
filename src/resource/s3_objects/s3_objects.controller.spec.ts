import { Test, TestingModule } from '@nestjs/testing';
import { S3ObjectsController } from './s3_objects.controller';
import { S3ObjectsService } from './s3_objects.service';

describe('S3ObjectsController', () => {
  let controller: S3ObjectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [S3ObjectsController],
      providers: [S3ObjectsService],
    }).compile();

    controller = module.get<S3ObjectsController>(S3ObjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
