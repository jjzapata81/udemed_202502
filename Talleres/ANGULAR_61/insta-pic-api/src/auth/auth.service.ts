import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ){}

  async login(request: LoginDto) {

    const user = await this.userService.findByUsername(request.username);
    //const user = this.users.find(user=>user.username===request.username);
    if(user && bcrypt.compareSync(request.password, user.password)){
      const payload = {id:user.id, username:user.username, urlAvatar:user.avatarUrl}
      return {
        success:true,
        token:await this.jwtService.signAsync(payload)
      }
    }
    throw new NotFoundException("Usuario o constraseña incorrectos");

  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
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
