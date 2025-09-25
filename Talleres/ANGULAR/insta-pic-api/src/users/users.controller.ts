import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): CreateUserDto {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): CreateUserDto[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): CreateUserDto {
    return this.usersService.findOne(id);
  }

  @Get('username/:username')
  findByUsername(@Param('username') username: string): CreateUserDto {
    return this.usersService.findByUsername(username);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto
  ): UpdateUserDto {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): { message: string } {
    return this.usersService.remove(id);
  }
}
