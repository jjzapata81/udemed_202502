import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserDto } from './dto/user-auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

  constructor(private readonly userService:UserService){
  }

  create(loginDto: LoginDto) {
    console.log(loginDto)
    const user = this.userService.findOne(loginDto.username)
    if(user && user.password===loginDto.password){
      return {
        success:true,
        token:"bdasbdfiewab"
      }
    }
    throw new NotFoundException("Usuario o contraseña incorrecta");
  }


}
