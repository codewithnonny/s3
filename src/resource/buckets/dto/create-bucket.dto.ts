import { IsNotEmpty } from 'class-validator';
import { User } from 'src/resource/users/entities/user.entity';

export class CreateBucketDto {
  @IsNotEmpty()
  name: string;

  user:User
}
