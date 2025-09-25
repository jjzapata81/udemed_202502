import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/create-auth.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(loginDto: LoginDto) {
    let token = 123;
    try {
      const userDB = this.usersService.findByUsername(loginDto.username);
      if (userDB && userDB.password === loginDto.password) {
        const {password:_, ...user} = userDB;
          return {
          success: true,
          message: 'Usuario encontrado',
          token,
          user
        };
      }
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    } catch (error) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }
  }

  async register(createUserDto: any) {
    return this.usersService.create(createUserDto);
  }
}
