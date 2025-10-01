import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'varchar', unique: true, nullable: false })
	username: string;

	@Column({ type: 'varchar', nullable: false })
	password: string;

	@Column({ type: 'varchar' })
	email?: string;

	@Column({ type: 'varchar' })
	name?: string;

	@Column({ type: 'varchar', name: 'avatar_url' })
	avatarUrl?: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'update_at' })
	updatedAt: Date;

	@Column({ type: 'boolean', name: 'is_active', default: true })
	isActive: boolean;
}
