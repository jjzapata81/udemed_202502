import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {

   users:User[]=[];

  create(createUserDto: CreateUserDto) {

    const user:User = {
      ...createUserDto,
      id: uuidv4(),
      createdAt:new Date(),
      updatedAt: new Date(),
      isActive:true
    };
    this.users.push(user);
    return {
      success:true,
      token:'weuywu7t7t7at7ta7igq33kqlkñq'
    };
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find(user=>user.id===id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    let user = this.users.find(user=>user.id===id)
    user!.isActive = false;
    return `This action removes a #${id} user`;
  }
}
