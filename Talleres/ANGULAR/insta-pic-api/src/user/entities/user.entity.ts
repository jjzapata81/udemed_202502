import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("users")

export class User {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({unique:true, nullable:false})
    username: string;
    @Column({type:'varchar', nullable: false})
    password: string;
    @Column({type:'varchar'})
    name: string;
    @Column()
    email: string;
    @Column({type:'varchar', name: 'avatar_url'})
    avatarUrl:string;
    @Column({name: 'created_at', default: new Date()})
    createAt: Date;
    @Column({name: 'update_at', default: new Date()})
    updateAt: Date;
    @Column({default: true})
    isActive: boolean;
}
