import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import LoginDto from './dto/create-auth.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import bcrypt from 'node_modules/bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    // console.log(loginDto);

    const user = this.userService.findByUsername(loginDto.username);

    console.log(user);
    // console.log(loginDto.password);

    // if(user && user.password === loginDto.password) {
    if (user && bcrypt.compareSync(loginDto.password, user.password)) {
      const payload = {
        username: user.username,
        id: user.id,
        avatarUrl: user.avatarUrl,
      };
      return {
        success: true,
        token: await this.jwtService.signAsync(payload),
      };
    }

    throw new NotFoundException('Usuario o contraseña incorrectos');
  }
}
