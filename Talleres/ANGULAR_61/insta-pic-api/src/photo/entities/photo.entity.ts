import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "./comment.entity";
import { User } from "src/user/entities/user.entity";

@Entity('gallery')
export class Photo {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(()=>User,user=>user.photo)
    user:User;

    @Column({type:'varchar'})
    url:string;

    @CreateDateColumn({name:'create_at'})
    createdAt:Date;

    @OneToMany(()=>Comment,(comment)=>comment.user)
    comments:Comment[];
}