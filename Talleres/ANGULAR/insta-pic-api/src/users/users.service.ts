import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

@Injectable()
export class UsersService {
  private users: User[] = []; // 👈 ya tipado, no más "never"

  create(createUserDto: CreateUserDto): User {
    const newUser: User = { id: Date.now(), ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto): User | null {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;

    this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
    return this.users[userIndex];
  }

  remove(id: number): { deleted: boolean } {
    this.users = this.users.filter(user => user.id !== id);
    return { deleted: true };
  }
}