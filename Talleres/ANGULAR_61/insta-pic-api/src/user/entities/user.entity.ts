import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type:'varchar', unique:true})
    username:string;

    @Column({type:'varchar'})
    password:string;
    
    @Column({type:'varchar', nullable:true})
    email?:string;
    
    @Column({type:'varchar', nullable:true})
    name?:string;
    
    @Column({type:'varchar', name:'avatar_url', nullable:true})
    avatarUrl?:string;

    @CreateDateColumn({name:'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name:'updated_at'})
    updatedAt:Date;

    @Column({type:'boolean', name:'is_active', default:true})
    isActive:boolean;

    @OneToMany(() => Comment, (comment) => comment.user)
    comments:Comment[]

}