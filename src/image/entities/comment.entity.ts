import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Image } from './image.entity';
import { User } from 'src/user/entities/user.entity';

export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.comments)
    user: User;

    @ManyToOne(() => Image, image => image.comments)
    image: Image;

    @Column({type: 'varchar'})
    message: string;

    @CreateDateColumn({name: 'create-at'})
    createdAt: string;
}