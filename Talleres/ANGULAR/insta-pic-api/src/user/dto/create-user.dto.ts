import {v4 as uuid4} from 'uuid';

export class CreateUserDto {
    id?: string;
    username:string;
    password:string;
    email?:string;
    name?:string;
    avatarUrl?:string;
    createdAt?:string;
    phhtotd?:[];
    isActive:boolean;
}
