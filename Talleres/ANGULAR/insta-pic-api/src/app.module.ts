import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';




@Module({
  imports: [UserModule, AuthModule], // 👈 agrega aquí ambos módulos
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}





