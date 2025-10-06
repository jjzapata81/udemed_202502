import { Comment } from 'src/image/entities/comment.entity';
import { Image } from 'src/image/entities/image.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ name: 'name', type: 'varchar' })
  fullName: string;

  @Column({ type: 'varchar', name: 'avatar_url', nullable: true })
  avatarUrl?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @OneToMany(() => Image, (image) => image.user)
  gallery: Image;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment;

  @BeforeInsert()
  preCreate() {
    this.fullName = this.fullName.toLowerCase();
  }
}
