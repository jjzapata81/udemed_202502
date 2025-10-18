/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import bcrypt from 'bcrypt';
import { UserReposotoryService } from './repository/user-reposotory.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private userRep:UserReposotoryService, 
    private jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRep.findBy(createUserDto.username);
    if(user){
      throw new BadRequestException('Usuario ya existe');
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(createUserDto.password, salt);

    try {
      const userEntity = this.userRep.create({
        ...createUserDto,
        password: hash,
      });
      this.userRep.save(userEntity);
      const payload = { id: userEntity.id, username: userEntity.username, urlAvatar: userEntity.avatarUrl };
      return {
        success: true,
        token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new BadRequestException(error['detail'] || 'Error al procesar la informacion');
    }
  }

  findByUsername(username: string) {
    return this.userRep.findBy(username);
  }

  findAll() {
    return this.userRep.findAll();
  }

  findOne(id: string) {
    return this.userRep.findOne(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRep.update(id, updateUserDto);
  }

}
