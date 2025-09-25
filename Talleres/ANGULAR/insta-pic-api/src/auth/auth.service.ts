import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import LoginDto from './dto/create-auth.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

  constructor(private readonly userService: UserService) {}

  login(loginDto: LoginDto) {
    console.log(loginDto);

    const user = this.userService.findByUsername(loginDto.username);

    console.log(user);
    console.log(loginDto.password);

    if(user && user.password === loginDto.password) {
      return {
        success: true,
        token: 'NAJNSDJANSDKNASKBFIA'
      }
    }

    throw new NotFoundException('Usuario o contraseña incorrectos');
  }
}
