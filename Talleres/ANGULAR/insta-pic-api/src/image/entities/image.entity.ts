import { Comment } from "./comment.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { User } from 'src/user/entities/user.entity';


@Entity('gallery')
export class Image {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({type: 'varchar'})           
    url: string;

    @ManyToOne(() => User, user => user.gallery)
    user: User;

    @CreateDateColumn({name: "created_at"})
    createdAt: Date;

    @OneToMany(() => Comment, comment => comment.image)
    comments: Comment[];
}
