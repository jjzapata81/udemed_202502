import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {

  constructor(private userService: UserService) {}


  login(loginDto: LoginDto) {
    const users = this.userService.findAll();
    const user = users.find(u => u.username === loginDto.username);
    if (user && user.password === loginDto.password) {
      return {
        success: true,
        token: 'fake-jwt-token',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name,
        }
      };
    }
    throw new NotFoundException('Usuario o contraseña incorrecta');
  }
}
