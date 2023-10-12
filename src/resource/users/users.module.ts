import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UniqueUserConstraint } from './constraint/unique-user.constraint';

@Module({
  imports:[TypeOrmModule.forFeature([User]),AuthModule],
  controllers: [UsersController],
  providers: [UsersService,UniqueUserConstraint],
  exports:[UsersService]
})
export class UsersModule {}
