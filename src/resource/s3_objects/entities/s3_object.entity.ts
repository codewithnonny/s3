import { Bucket } from 'src/resource/buckets/entities/bucket.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';



@Entity()
export class S3Object {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileId: string;

  @ManyToOne(() => Bucket, (bucket) => bucket.objects)
  @JoinColumn()
  bucket: Bucket;
}
