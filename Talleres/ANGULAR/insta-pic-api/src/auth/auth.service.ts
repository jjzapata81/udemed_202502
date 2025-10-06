import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {

  users = [
    {username: 'jjzapata' , password:"1234"},
    {username: 'stevenudo' , password:"3126"}
  ]
  
  login(LoginDto: LoginDto) {
    console.log(LoginDto)
    const  user = this.users.find(user=>user.username ===  LoginDto.username);
    if(user && user.password === LoginDto.password){
      return {
        success:true,
        token: 'akdjaskjedasdhasdjkashdnksd'

      }
    }
    throw new NotFoundException('Usuario o contraseña incorrecta');
  }

}
