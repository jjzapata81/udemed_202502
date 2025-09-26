import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {

    username: string;
    password: string;
    name: string;
    email: string;
    avatarUrl?: string;

}