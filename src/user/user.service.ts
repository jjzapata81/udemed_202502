import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  users: User[] = [];

  async create(createUserDto: CreateUserDto) {
    try {
      const userEntity = this.userRepository.create(createUserDto);

      await this.userRepository.save(userEntity);
      return {
        success: true,
        token: 'fbsj4guw3wgjfwegjgyfhVJSFGKUFUGKS',
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error no controlado');
    }

    // this.users.push({
    //   ...createUserDto,
    //   id: uuidv4(),
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    //   isActive: true,
    // });
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    // Esto tiene el mismo efecto que lo que pusimos abajo
    // this.userRepository.findOneBy({ id: id })
    return this.userRepository.findOneBy({ id });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    this.users.map((user) => {
      if (user.id === id) {
        user.avatarUrl = updateUserDto.avatar || user.avatarUrl;
        user.name = updateUserDto.name || user.name;
        user.email = updateUserDto.email || user.email;
      }
    });
    return {
      success: true,
    };
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
