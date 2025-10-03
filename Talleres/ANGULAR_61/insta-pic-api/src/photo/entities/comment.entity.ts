import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Photo } from "./photo.entity";

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(()=> User,(user)=>user.comments)
    user: User;

    @ManyToOne(()=> Photo, (photo)=>photo.comments)
    photo: Photo;

    @Column({ type: 'varchar' })
    message: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}