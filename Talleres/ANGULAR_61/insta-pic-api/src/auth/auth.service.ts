import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AuthService {


  users = [
    {username:'jjzapata', password:'1234'},
    {username:'jjzapata2', password:'1234'},
    {username:'jjzapata3', password:'1234'}
  ]

  login(request: LoginDto) {

    const user = this.users.find(user=>user.username===request.username);
    if(user && user.password===request.password){
      return {
        success:true,
        token:'uasegkus6q267q2rdf6ed5qdffud'
      }
    }
    throw new NotFoundException("Usuario o constraseña incorrectos");

  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
