import { Injectable, NotFoundException } from '@nestjs/common';
import LoginDto from './dto/create-auth.dto';

@Injectable()
export class AuthService {

  users = [
    {
      username: "Tepho",
      password: "1234"
    },
    {
      username: "Nathy",
      password: "1234"
    },
    {
      username: "Meli",
      password: "1234"
    }
  ];

  login(loginDto: LoginDto) {
    console.log(loginDto);

    const user = this.users.find(user => user.username === loginDto.username);

    if(user && user.password === loginDto.password) {
      return {
        success: true,
        token: 'NAJNSDJANSDKNASKBFIA'
      }
    }

    throw new NotFoundException('Usuario o contraseña incorrectos');
  }
}
