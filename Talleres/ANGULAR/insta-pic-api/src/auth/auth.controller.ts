import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PassThrough } from 'stream';
import { log } from 'console';
import { NotFoundError } from 'rxjs';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  login(@Body() loginDto: LoginDto){
    return this.authService.login(loginDto);
  }
  
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get('query')
  findOne(@Query('id') id: string, @Query('otro') id2: string) {
    console.log(id, id2)
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id/:otro')
  remove(@Param('id') id: string, @Param('otro') id2:string) {
    console.log('El id es :', id)
    console.log('El id2 es :', id2)
    return this.authService.remove(+id);
  }
}
