import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto);
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User | undefined {
    return this.users.find(u => u.id === id);
  }

  update(id: string, updateUserDto: UpdateUserDto): User | null {
    const user = this.findOne(id);
    if (!user) return null;

    Object.assign(user, updateUserDto);
    user.updatedAt = new Date();
    return user;
  }

  remove(id: string): { deleted: boolean } {
    const user = this.findOne(id);
    if (!user) return { deleted: false };
    user.isActive = false;
    user.updatedAt = new Date();

    return { deleted: true };
  }
}