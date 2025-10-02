import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from './comment.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('gallery')
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar' })
  url: string;

  @ManyToOne(() => User, (user) => user.gallery)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.image)
  comments: Comment[];
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
