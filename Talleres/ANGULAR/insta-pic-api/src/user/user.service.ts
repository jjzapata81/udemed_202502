import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {

  users:User[] = [];

  create(createUserDto: CreateUserDto) {

    this.users.push({
      ...createUserDto,
      id:uuidv4(),
      createdAt:new Date(),
      updatedAt:new Date(),
      isActive:true
    })
    return {
      success:true,
      token:'fbsj4guw3wgjfwegjgyfhVJSFGKUFUGKS'
    };
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: string) {
    return this.users.find(user=>user.id===id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    this.users.map(user=>{
      if(user.id===id){
        user.avatarUrl = updateUserDto.avatar||user.avatarUrl;
        user.name = updateUserDto.name||user.name;
        user.email = updateUserDto.email||user.email;
      }
    })
    return {
      success:true
    };
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
