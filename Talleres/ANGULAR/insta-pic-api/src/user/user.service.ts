import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  private users: User[] = [];

  create(data: CreateUserDto): User {
    const newUser = new User(data);
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findById(id: string): User {
    const user = this.users.find(u => u.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  findByUsername(username: string): User {
    const user = this.users.find(u => u.username === username);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  update(id: string, data: UpdateUserDto): User {
    const user = this.findById(id);
    Object.assign(user, data);
    user.updatedAt = new Date();
    return user;
  }

  delete(id: string): User {
    const user = this.findById(id);
    user.isActive = false; // eliminación lógica
    user.updatedAt = new Date();
    return user;
  }
}
