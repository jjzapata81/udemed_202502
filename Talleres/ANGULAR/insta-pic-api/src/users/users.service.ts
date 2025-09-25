import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  
  private users: User[] = [];

  create(createUserDto: CreateUserDto): CreateUserDto {
    const existingUser = this.users.find(user => user.username === createUserDto.username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const existingEmail = this.users.find(user => user.email === createUserDto.email);
    if (existingEmail) {
      throw new ConflictException('Email already exists');
    }

    const user = new User();
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    user.email = createUserDto.email;
    user.name = createUserDto.name;
    user.avatar = createUserDto.avatar || '';

    this.users.push(user);
    return user;
  }

  findAll(): CreateUserDto[] {
    return this.users.filter(user => user.isActive);
  }

  findOne(id: string): CreateUserDto {
    const user = this.users.find(user => user.id === id && user.isActive);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  findByUsername(username: string): CreateUserDto {
    const user = this.users.find(user => user.username === username && user.isActive);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto): UpdateUserDto {
    const userIndex = this.users.findIndex(user => user.id === id && user.isActive);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }

    const user = this.users[userIndex];

    if (updateUserDto.email) {
      const existingEmail = this.users.find(u => u.email === updateUserDto.email && u.id !== id);
      if (existingEmail) {
        throw new ConflictException('Email already exists');
      }
    }

    if (updateUserDto.email !== undefined) user.email = updateUserDto.email;
    if (updateUserDto.name !== undefined) user.name = updateUserDto.name;
    if (updateUserDto.avatar !== undefined) user.avatar = updateUserDto.avatar;

    user.updatedAt = new Date();

    return user;
  }

  remove(id: string): { message: string } {
    const userIndex = this.users.findIndex(user => user.id === id && user.isActive);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }

    this.users[userIndex].isActive = false;
    this.users[userIndex].updatedAt = new Date();

    return { message: 'User deleted successfully' };
  }

}
