import { Image } from 'src/image/entities/image.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  BeforeInsert,
  CreateDateColumn,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { Comment } from 'src/image/entities/comment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  username: string;
  @Column({ type: 'varchar', nullable: false })
  password: string;
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'varchar', nullable: true })
  email: string;
  @Column({ name: 'avatar_url', type: 'varchar', nullable: true })
  avatarUrl?: string;
  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt: string;
  @CreateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: string;
  @Column({ name: 'is_active', default: true, nullable: true })
  isActive: boolean;

  @OneToMany(() => Image, (image) => image.user)
  gallery: Image[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @BeforeInsert()
  @BeforeUpdate()
  preCreate() {
    this.name = this.name.toLowerCase();
  }
}
