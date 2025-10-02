import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {v4 as uuid4} from 'uuid';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private userRepository:Repository<User>){}


  users: CreateUserDto[] = []

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
    /*const user_dto = { ...createuserDto, id: uuid4() };
    
    this.users.push(user_dto)
    console.log(this.users)*/
  };

  findAll() {
    return this.userRepository.find()
  };

  findOne(id?: string,username?: string) {
    console.log('llegoooo')
    if (id){
      console.log("ll")
      return this.users.find(user=> user.id === id)
      
    }

    if (username){
      console.log("jjjj")
      return this.users.find(user=> user.username === username)
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex(user=> user.id === id)
    this.users[index]={ ...this.users[index], ...updateUserDto }   
  }

  remove(id:string) {
    this.users.forEach(user=> {if(user.id ===id){ user.isActive= false}})

  }
}
