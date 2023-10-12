import { Bucket } from 'src/resource/buckets/entities/bucket.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Bucket, (bucket) => bucket.user)
  buckets: Bucket[];
}
