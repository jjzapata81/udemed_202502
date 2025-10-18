import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hola World!';
  }

  createHello(): string {
    return 'Crear Hola';
  }
}
