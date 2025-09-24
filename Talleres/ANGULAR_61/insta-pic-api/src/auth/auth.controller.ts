import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadGatewayException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/Login.dto';

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
  findOne(@Param('id') id: string, @Param('id2') id2:string) { // El Parama obliga a que si o si se manden
    return this.authService.findOne(+id);
  }

    @Get('find') 
  findByIdOrUsername(@Query('id') id: string, @Query('id') id2:string, @Query('username') username:string) { 
    if(id){
      return `Busqueda por id: ${id}`
    }else if(username){
      return `Busqueda por nombre de usuario: ${username}`
    }else{
        return 'No hay parámetros para la búsqueda';
    }
    // return this.authService.findOne(+id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete('query') // Se usa cuando se necesita que se manden varios parámetros de manera opcional
  remove(@Query('id') id: string) {
    console.log(id);
    return this.authService.remove(+id); // se pone el + para que javascript lo convierta a numeros
    
  }

  @Post('login')
    login(@Body()request:LoginDto){
      if(request.password && request.username){
        return this.authService.login(request)
      }
      throw new BadRequestException("Username y passwords son obligatorios")
    }
  
}
