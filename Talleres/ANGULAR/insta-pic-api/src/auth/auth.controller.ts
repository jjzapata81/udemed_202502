import { Controller, Post, Body} from '@nestjs/common';
import { AuthService } from './auth.service';
import {LoginDto} from './dto/create-auth.dto';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  login(@Body() LoginDto: LoginDto) {
    return this.authService.Login(LoginDto);
  }
}
