/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  login(request: LoginDto) {
    const user = this.userService.findByUsername(request.username);
    if (user && bcrypt.compareSync(request.password, user.password)) {
      const payload = { id: user.id, username: user.username, url: user.url, email:user.email, name:user.name };
      return {
        success: true,
        token: this.jwtService.sign(payload),
      };
    }
    throw new NotFoundException('Usuario o constraseña incorrectos');
  }

}
