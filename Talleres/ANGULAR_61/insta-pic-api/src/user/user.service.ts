import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  private users: User[] = [];

  constructor() {
    // Agregar usuarios de ejemplo para pruebas
    this.initializeDefaultUsers();
  }

  private initializeDefaultUsers() {
    const defaultUsers = [
      {
        id: uuidv4(),
        username: 'admin',
        password: '123456',
        name: 'Administrador',
        email: 'admin@instapic.com',
        avatarUrl: 'https://admin',
        photos: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      },
      {
        id: uuidv4(),
        username: 'johnatan Toro',
        password: '123456',
        name: 'John Doe',
        email: 'john@example.com',
        avatarUrl: 'https://johnatan',
        photos: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      },
      {
        id: uuidv4(),
        username: 'Janeth Toro',
        password: '123456',
        name: 'Jane Doe',
        email: 'jane@example.com',
        avatarUrl: 'https://Janeth',
        photos: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      }
    ];

    this.users.push(...defaultUsers.map(userData => new User(userData)));
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    // Verificar si el username ya existe
    const existingUserByUsername = this.users.find(
      user => user.username === createUserDto.username
    );
    if (existingUserByUsername) {
      throw new ConflictException('Username already exists');
    }

    // Verificar si el email ya existe
    const existingUserByEmail = this.users.find(
      user => user.email === createUserDto.email
    );
    if (existingUserByEmail) {
      throw new ConflictException('Email already exists');
    }

    // Crear nuevo usuario
    const newUser = new User({
      id: uuidv4(),
      username: createUserDto.username,
      password: createUserDto.password, // En producción, hashear la contraseña
      name: createUserDto.name,
      email: createUserDto.email,
      avatarUrl: createUserDto.avatarUrl,
      photos: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    });

    this.users.push(newUser);
    return this.toResponseDto(newUser);
  }

  async findAll(): Promise<UserResponseDto[]> {
    return this.users
      .filter(user => user.isActive)
      .map(user => this.toResponseDto(user));
  }

  async findById(id: string): Promise<UserResponseDto> {
    const user = this.users.find(user => user.id === id && user.isActive);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.toResponseDto(user);
  }

  async findByUsername(username: string): Promise<UserResponseDto> {
    const user = this.users.find(user => user.username === username && user.isActive);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.toResponseDto(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }

    const currentUser = this.users[userIndex];
    const updatedUser = {
      ...currentUser,
      ...updateUserDto,
      id: currentUser.id, 
      createdAt: currentUser.createdAt, 
      updatedAt: new Date(), 
    };

    this.users[userIndex] = updatedUser;
    return this.toResponseDto(updatedUser);
  }

  async remove(id: string): Promise<void> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }

    this.users.splice(userIndex, 1);
  }


  private toResponseDto(user: User): UserResponseDto {
    const { password, ...userResponse } = user;
    return userResponse;
  }
}