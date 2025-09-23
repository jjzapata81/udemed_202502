import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {

  users=[{username:"meli", password:"1234"},{username:"meli2", password:"1234"}]

  create(loginDto: LoginDto) {
    console.log(loginDto)
    const user = this.users.find(user=>user.username==loginDto.username)
    if(user && user.password===loginDto.password){
      return {
        success:true,
        token:"bdasbdfiewab"
      }
    }
    throw new NotFoundException("Usuario o contraseña incorrecta");
  }


}
