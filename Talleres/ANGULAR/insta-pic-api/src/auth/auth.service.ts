import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {

  users = [
    {username: 'jjzapata', password: '1234' },
    {username: 'jmyepes', password: '1234' },
    {username: 'vcguzman', password: '1234' }
  ];

  login(loginDto: LoginDto) {
    console.log("Login DTO:", loginDto);
    
    const user = this.users.find(user => user.username === loginDto.username);
    if (user && user.password === loginDto.password) {
      return {
        success: true,
        token: 'fake-jwt-token'
      }
    }
    throw new NotFoundException('Usuario o contraseña incorrecta');
  }
}
