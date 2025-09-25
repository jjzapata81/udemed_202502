import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserModuleDto } from './dto/create-user-module.dto';
import { UpdateUserModuleDto } from './dto/update-user-module.dto';

@Injectable()
export class UserModuleService {
  // Simulamos la base de datos en memoria
  private users: CreateUserModuleDto[] = [];

  // CREATE – genera un usuario con UUID
  create(createUserModuleDto: CreateUserModuleDto) {
    const newUser: CreateUserModuleDto = {
      ...createUserModuleDto,
      id: uuidv4(), // genera un UUID
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: createUserModuleDto.isActive ?? true,
      photos: createUserModuleDto.photos ?? [],
    };
    this.users.push(newUser);
    return newUser;
  }

  // READ – obtener todos los usuarios
  findAll() {
    return this.users;
  }

  // READ – obtener un usuario por id (UUID)
  findOne(id: string) {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  // READ por username
  findByUsername(username: string) {
    const user = this.users.find((u) => u.username === username);
    if (!user) throw new NotFoundException(`User with username "${username}" not found`);
    return user;
  }

  // UPDATE
  update(id: string, changes: UpdateUserModuleDto) {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) throw new NotFoundException(`User with id ${id} not found`);

    const updatedUser = {
      ...this.users[index],
      ...changes,
      updatedAt: new Date(),
    };
    this.users[index] = updatedUser;
    return updatedUser;
  }

  // DELETE – eliminar un usuario por id (UUID)
  remove(id: string) {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const [removed] = this.users.splice(userIndex, 1);
    return removed;
  }
}
