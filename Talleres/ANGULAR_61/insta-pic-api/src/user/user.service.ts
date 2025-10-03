import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private userRepository:Repository<User>){

  }

   users:User[]=[];

  async create(createUserDto: CreateUserDto) {

    try{
      let userEntity = this.userRepository.create(createUserDto)
      await this.userRepository.save(userEntity);
        return {
          success:true,
          token:'weuywu7t7t7at7ta7igq33kqlkñq'
        };
      }catch(error){
        console.log(error);
        throw new BadRequestException(error.detail||'Error al procesar la informacion');
      }
  }

  findAll() {
    return this.userRepository.find({where:{isActive:true}, select:['id', 'username', 'name']});
   /* return this.userRepository.find({select:{
      id:true,
      username:true,
      name:true,
      email:true
    }});*/
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