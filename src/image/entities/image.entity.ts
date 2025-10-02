import { CreateDateColumn, ManyToOne, OneToMany } from 'typeorm/browser';
import { Comment } from './comment.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity('gallery')
export class Image {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar'})
    url: string;

    @ManyToOne(() => User, (user) => user.gallery)
    user: User;

    @CreateDateColumn({name: 'create-at'})
    createdAt: string;
    
    @OneToMany(()=> Comment, comment => comment.image)
    comments: Comment[];
}