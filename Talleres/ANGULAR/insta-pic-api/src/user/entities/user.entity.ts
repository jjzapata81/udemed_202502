import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn, UpdateDateColumn } from 'typeorm';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ unique: true, nullable: false })
  username: string;
  @Column({ type: 'varchar', nullable: false })
  password: string;
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ name: 'avatar_url', type: 'varchar', nullable: true })
  avatarUrl?: string;

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;
  @Column({ default: true, nullable: true})
  isActive: boolean;

  @BeforeInsert()
  preCreate() {
    this.username = this.username.toLowerCase();
    this.password = this.password.toLowerCase();
    this.name = this.name.toLowerCase();
    this.email = this.email.toLowerCase();
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.isActive = true;
  }
}
