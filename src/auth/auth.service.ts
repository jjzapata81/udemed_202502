import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {

  users = [
    {username:"jjzapata", password:"1234"},
    {username:"jjzapata1", password:"1234"},
    {username:"jjzapata2", password:"1234"}
  ]

  login(loginDto: LoginDto) {
    console.log(loginDto);

    const user = this.users.find(user=>user.username===loginDto.username);
    if(user && user.password===loginDto.password){
      return {
        success:true,
        token:'EWASDYJGDLWKHFLNEGLENGLNGELKNGÑ'
      }
    }
    throw new NotFoundException('Usuario o contraseña incorrectos');
  }

}
