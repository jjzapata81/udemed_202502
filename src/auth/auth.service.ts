import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/create-auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService){

  }

  login(LoginDto: LoginDto) {
    console.log(LoginDto);

    const user = this.userService.findByUsername(LoginDto.username);
    if (user && user.password===LoginDto.password) {
      return {
        success: true,
        token: 'JASJAJSJAJAA'
      }
    }
    throw new NotFoundException('Usuario o contraseña incorrecta');
  }

}
