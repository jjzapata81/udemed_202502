import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("v1/")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("find")
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("otro")
  otherCreateHello(){
    return "OtroCreate Hello"
  }

  @Post("otro/mas")
  anotherCreateHello(){
    return "Otro mas Create Hello"
  }

  @Post()
  createHello(){
    return "Create Hello"
  }

}
