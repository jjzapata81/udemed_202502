import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

  constructor(private userService: UserService) {}

  users = [
      {username:"jjzapata", password:"1234"},
      {username:"dilan", password:"1234"},
      {username:"arley", password:"1234"}
    ]
  
  login(loginDto: LoginDto) {
      console.log(loginDto);
      const users = this.userService.findAll();
      const user = users.find(user=>user.username===loginDto.username);
      if (user && user.password===loginDto.password){
        return{
          success:true,
          token:"JISGNJISFVNISJNVRIUNVSANJJF"
        }
      }
    throw new NotFoundException;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
