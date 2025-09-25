import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {

  users: CreateUserDto[] = [];

  create(createUserDto: CreateUserDto) {
    const newUser = {...createUserDto, id: uuidv4(), isActive: true};
    this.users.push(newUser);
    return newUser;
  }

  findAll() {
    return this.users.filter(user => user.isActive)
  }

  findOne(id: string) {
    return this.users.find(user => user.id === id && user.isActive);
  }

  findByUsername(username: string){
    const usersdb = this.users.find(user => user.username === username);
    console.log(this.users)
    console.log(usersdb)
    return usersdb;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.users.find(user => user.id === id && user.isActive);
    if (user) {
      Object.assign(user, updateUserDto);
      user.updateAt = new Date();
      return user;
    }
    return null;
  }

  remove(id: string) {
    const user = this.users.find(user => user.id === id && user.isActive );
    if (user) {
      user.isActive = false;
      user.updateAt = new Date();
      return user;
    }
    return null;
  }
}
