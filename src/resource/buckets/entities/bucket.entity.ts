import { S3Object } from 'src/resource/s3_objects/entities/s3_object.entity';
import { User } from 'src/resource/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Bucket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.buckets)
  @JoinColumn()
  user: User;

  @OneToMany(() => S3Object, (s3Object) => s3Object.bucket)
  objects: S3Object[];
}
