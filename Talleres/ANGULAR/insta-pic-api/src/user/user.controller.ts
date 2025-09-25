import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post()
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }


  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }


  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }


  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  
  @Post('login')
  login(@Body('username') username: string) {
    return this.userService.findByUsername(username);
  }
}
