import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./comment.entity";
import { User } from "src/user/entities/user.entity";

@Entity('Gallery')

export class Photo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(()=> User, (user) => user.photos)
    user: User;

    @Column({ type: 'varchar' })
    url: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @OneToMany(()=> Comment, (comment) => comment.user)
    comments: Comment[];

}