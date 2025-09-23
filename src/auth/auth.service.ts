import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {

  users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
    { username: 'user3', password: 'password3' },
  ]


  login(LoginDto: LoginDto) {
    console.log(LoginDto);

    const user =this.users.find(user=>user.username===LoginDto.username);
    if (user && user.password===LoginDto.password) {
      return {
        success: true,
        token: 'JASJAJSJAJAA'
      }
    }
    throw new NotFoundException('Usuario o contraseña incorrecta');
  }

}
