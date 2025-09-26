import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  private users: User[] = [];

  createUser(createUserDto: CreateUserDto): User {
    const user: User = {
      id: uuid(),
      ...createUserDto,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    };

    this.users.push(user);
    console.log('Usuario creado:', user);
    return user;
  }

  getAllUsers(): User[] {
    return this.users.filter(user => user.isActive);
  }

  getUserById(id: string): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    if (!user.isActive) {
      throw new NotFoundException(`Usuario con ID ${id} no está activo`);
    }
    return user;
  }

  getUserByUsername(username: string): User {
    const user = this.users.find((user) => user.username === username);
    if (!user) {
      throw new NotFoundException(`Usuario con username ${username} no encontrado`);
    }
    if (!user.isActive) {
      throw new NotFoundException(`Usuario con username ${username} no está activo`);
    }
    return user;
  }

  updateUser(id: string, updateUserDto: UpdateUserDto): User {
    const userIndex = this.users.findIndex((user) => user.id === id);
    
    if (userIndex === -1) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    if (!this.users[userIndex].isActive) {
      throw new NotFoundException(`Usuario con ID ${id} no está activo`);
    }

    const updatedUser: User = {
      ...this.users[userIndex],
      ...updateUserDto,
      updatedAt: new Date(),
    };

    this.users[userIndex] = updatedUser;
    console.log('Usuario actualizado:', updatedUser);
    return updatedUser;
  }

  deleteUser(id: string): { message: string; user: User } {
    const userIndex = this.users.findIndex((user) => user.id === id);
    
    if (userIndex === -1) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    if (!this.users[userIndex].isActive) {
      throw new NotFoundException(`Usuario con ID ${id} ya está eliminado`);
    }

    const deletedUser: User = {
      ...this.users[userIndex],
      isActive: false,
      updatedAt: new Date(),
    };

    this.users[userIndex] = deletedUser;
    console.log('Usuario eliminado (soft delete):', deletedUser);
    
    return {
      message: `Usuario con ID ${id} eliminado exitosamente`,
      user: deletedUser
    };
  }
}
