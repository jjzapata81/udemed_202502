import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id/:id2')
  findOne(@Param('id') identificador: string, @Param('id2') id2:string) {
    console.log('id1:', identificador);
    console.log('id2:', id2);
    return this.authService.findOne(+identificador);
  }

  @Get('find')
  findByIdOrUsername(@Query('id') id: string, @Query('username') username:string) {
    if(id){
      return `Búsqueda por id: ${id}`
    }else if(username){
      return `Búsqueda por nombre de usuario: ${username}`
    }else{
      return this.authService.findAll();
    }

    //return this.authService.findOne(+identificador);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete('query')
  remove(@Query('id') id: string, @Query('id2') id2:string) {

    console.log(id);
    console.log(id2);
    return this.authService.remove(+id);
  }

  @Post('login')
  login(@Body() request:LoginDto){
    if(request.password && request.username){
      return this.authService.login(request);
    }
    throw new BadRequestException("username y password son obligatorios")
  }




  
}
