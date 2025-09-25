import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const user: User = {
      id: uuid(),
      ...createUserDto,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    };

    this.users.push(user);
    console.log(this.users);
    return user;
  }

  findAll() {
    return this.users;
  }

  findById(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(`Usuario no encontrado`);
    return user;
  }

  findByUsername(username: string) {
    const user = this.users.find((user) => user.username === username);
    if (!user) throw new NotFoundException(`Usuario no encontrado`);
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    const updatedUser: User = {
      ...this.users[userIndex],
      ...updateUserDto,
      updatedAt: new Date(),
    };

    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  remove(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    const deletedUser: User = {
      ...this.users[userIndex],
      isActive: false,
    };

    this.users[userIndex] = deletedUser;
    return deletedUser;
  }
}
