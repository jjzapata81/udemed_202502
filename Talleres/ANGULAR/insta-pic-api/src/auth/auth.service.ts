import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  login(loginDto: LoginDto) {
    // const users = this.usersService.findAll();
    // const user = users.find((user) => user.username === loginDto.username);
    // if (user && user.password === loginDto.password) {
    //   return {
    //     success: true,
    //     token: 'asdasdasdasdadas',
    //   };
    // }
    // throw new NotFoundException('Usuario o contraseña incorrectos');
  }
}
