import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {v4 as uuid4} from 'uuid';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {

  users: CreateUserDto[] = []

  createUser(createuserDto:CreateUserDto){
    const user_dto = { ...createuserDto, id: uuid4() };
    
    this.users.push(user_dto)
    console.log(this.users)
  };

  findAll() {
    return this.users
  };

  findOne(id?: string,username?: string) {
    console.log('llegoooo')
    if (id){
      return this.users.find(user=> user.id === id)
    }
    if (username){
      return this.users.find(user=> user.username === username)
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex(user=> user.id === id)
    this.users[index]={ ...this.users[index], ...updateUserDto }   
  }

  remove(id:string) {
    this.users.forEach(user=> {if(user.id ===id){ user.isActive= false}})

  }
}
