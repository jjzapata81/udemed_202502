import { User } from "src/user/entities/user.entity";
import { Comment } from "./comment.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('gallery')

export class Image{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type:'varchar'})
    url:string;

    @Column({name:'created_at'})
    createdAt:Date;

    @ManyToOne(()=>User, (user)=>user.gallery)
    user:User;

    @OneToMany(()=>Comment, comment=>comment.image)
    comments:Comment[]
}