import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/create-auth.dto';
import bcrypt from "bcryptjs";
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

  constructor(private userService: UserService){
  }

  users = [
    {username:"jjzapata", password:"1234"},
    {username:"jjzapata1", password:"1234"},
    {username:"jjzapata2", password:"1234"}
  ]

  async login(loginDto: LoginDto) {
    console.log(loginDto);

    const user = await this.userService.findByUsername(loginDto.username);

    //const user = this.users.find(user=>user.username===loginDto.username);
    


    //if(user && user.password===loginDto.password){

    if(user &&  bcrypt.compareSync(loginDto.password, user.password)){  
      return {
        success:true,
        token:'EWASDYJGDLWKHFLNEGLENGLNGELKNGÑ'
      }
    }
    throw new NotFoundException('Usuario o contraseña incorrectos');
  }

}
