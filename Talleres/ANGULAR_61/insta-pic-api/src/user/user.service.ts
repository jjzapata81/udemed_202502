import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  users : CreateUserDto[] = [];

  create(createUserDto: CreateUserDto) {
    const newUser = {
      id: createUserDto.id,
      username: createUserDto.username,
      password: createUserDto.password,
      email: createUserDto.email,
      name: createUserDto.name,
    };

    this.users.push(newUser)
    return {
      success:true  };
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    const user = this.users.find((u)=> u.id === id); 
    if (!user){
      throw new NotFoundException(`El usuario con el id ${id} no fue encontrado`)
    }
    return {
      success:true
    };
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    this.users.map((user) => {
      if(user.id === id){
        user.email = updateUserDto.email || user.email;
        user.name = updateUserDto.name || user.name;
  
      }
    }
  )
    return {
      success:true
    };

  }

  remove(id: string) {
    const user  = this.users.find((u)=> u.id === id);
    if(!user){
      throw new NotFoundException(`El usuario con el id ${id} no fue encontrado`)
    }
    this.users.filter((u)=> u.id !== id);
    return {
      success : true
    }
  }
}
