import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Comment } from "./comment.entity";
import { User } from "src/user/entities/user.entity";

@Entity('gallery')
export class Photo {

	@PrimaryColumn('uuid')
	id: string;

	@ManyToOne(() => User, user => user.photos)
	user: User;

	@Column({ type: 'varchar' })
	url: string;

	@CreateDateColumn({ name: 'create_at' })
	createdAt: Date;


	@OneToMany(() => Comment, comment => comment.photo)
	comments: Comment[];
}

