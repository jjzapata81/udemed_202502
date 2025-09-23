import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  users = [
    {
      username: 'juan',
      password: '1234',
    },
    {
      username: 'jose',
      password: '1234',
    },
    {
      username: 'maria',
      password: '1234',
    },
  ];

  Login(LoginDto: LoginDto) {
    console.log(LoginDto);
    const user = this.users.find((user) => user.username === LoginDto.username);
    if (user && user.password === LoginDto.password) {
      return {
        success: true,
        message: 'Usuario encontrado',
        token: '1234567890',
      };
    }
    throw new NotFoundException('Usuario o contraseña incorrectos');
  }
}
