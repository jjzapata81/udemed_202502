import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('v1/app')
export class AppController {
  constructor(private readonly appService: AppService) { }
  
  
  @Post()
  createHello(): string {
    return this.appService.createHello();
  }

  @Get('find')
  getHelloWorld(): string {
    return "Holaasssssssssss";
  }


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }






}
