import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsString, MinLength, IsEmail } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    
    username?: string;
    password?: string;
    name?: string;
    email?: string;
    avatarUrl?: string;
    isActive?: boolean;
    photos?: any[];
}