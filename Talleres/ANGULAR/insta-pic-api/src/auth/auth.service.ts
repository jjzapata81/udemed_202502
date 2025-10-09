import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService
    ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByUsername(loginDto.username);
    if (user && bcrypt.compareSync(loginDto.password, user.password)) {
      const payload = { username: user.username, id: user.id, avatarUrl: user.avatarUrl}
      return {
        success: true,
        token: await this.jwtService.signAsync(payload)
      }
    }
    throw new NotFoundException('Usuario o contraseña incorrecta');
  }
}
