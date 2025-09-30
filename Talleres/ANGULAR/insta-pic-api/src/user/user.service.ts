import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    // Injectamos un repositorio de user
  }

  users: CreateUserDto[] = [];

  async create(createUserDto: CreateUserDto) {
    try {
      const userEntity = this.userRepository.create(createUserDto);
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
    const usersdb = this.users.find((user) => user.username === username);
    console.log(this.users);
    console.log(usersdb);
    return usersdb;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.users.find((user) => user.id === id && user.isActive);
    if (user) {
      Object.assign(user, updateUserDto);
      user.updateAt = '22-12-2025';
      return user;
    }
    return null;
  }

  remove(id: string) {
    const user = this.users.find((user) => user.id === id && user.isActive);
    if (user) {
      user.isActive = false;
      user.updateAt = '22-12-2025';
      return user;
    }
    return null;
  }
}
