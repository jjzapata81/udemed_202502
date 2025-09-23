import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  users = [
    { username: 'jjzapata', password: '1234' },
    { username: 'jjzapata1', password: '1234' },
    { username: 'jjzapata2', password: '1234' },
    { username: 'jjzapata3', password: '1234' },
  ];

  login(loginDto: LoginDto) {
    console.log(loginDto);

    const user = this.users.find((user) => user.username === loginDto.username);
    if (user && user.password === loginDto.password) {
      return { success: true, token: 'KJGRIGJRIFRFO' };
    }

    throw new NotFoundException('Usuario o contraseña incorrectos');
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
