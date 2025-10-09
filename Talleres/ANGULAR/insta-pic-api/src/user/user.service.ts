import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'node_modules/bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    // Injectamos un repositorio de user
  }

  users: User[] = [];

  async create(createUserDto: CreateUserDto) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(createUserDto.password, salt);

    try {
      const userEntity = this.userRepository.create({
        ...createUserDto,
        password: hash,
      });
      await this.userRepository.save(userEntity);
      return {
        succes: true,
        token: 'nasojdoasndoasd',
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('No se pudo crear el usuario');
    }

    // this.users.push(newUser);
    // return newUser;
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    // Esto tiene el mismo efecto
    // this.userRepository.findOneBy({ id: idUser });

    return this.userRepository.findOneBy({ id });
  }

  findByUsername(username: string) {
    const user = this.users.find((user) => user.username === username);
    console.log(user);
    if (!user || !user.isActive) {
      throw new NotFoundException('El username no existe');
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException('User ID does not exist');
    }

    const currentUser = this.users[userIndex];
    const updatedUser = {
      ...currentUser,
      ...updateUserDto,
      updatedAt: new Date(),
    };
    // this.users[userIndex] = updatedUser;
    return { status: true, message: 'User updated successfully' };
  }

  remove(id: string) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException('User ID does not exist');
    }

    this.users[userIndex].isActive = false;
    return { status: true, message: 'User deleted successfully' };
  }
}
