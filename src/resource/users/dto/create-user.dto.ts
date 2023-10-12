import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { UniqueUserConstraint } from '../constraint/unique-user.constraint';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Validate(UniqueUserConstraint)
  email: string;

  @IsNotEmpty()
  password: string;
}
