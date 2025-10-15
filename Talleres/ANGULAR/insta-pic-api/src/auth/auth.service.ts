import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/create-auth.dto';
import bcrypt from 'node_modules/bcryptjs';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

  constructor(private readonly userService: UserService, private readonly jwtService: JwtService){
    this.userService = userService;
    this.jwtService = jwtService;
  }
  users = []

  async login(loginDto: LoginDto) {
    console.log(loginDto);

    const user = await this.userService.findByUsername(loginDto.username);

    if(user && bcrypt.compareSync(loginDto.password, user.password)){
      const payload = {username:user.username, id:user.id, avatarUrl:user.avatarUrl}

      return {
        success:true,
        token: await this.jwtService.signAsync(payload)
      }
    }
    throw new NotFoundException('Usuario o contraseña incorrectos');
  }

}
