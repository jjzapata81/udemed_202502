import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModuleModule } from './user-module/user-module.module';

@Module({
  imports: [AuthModule, UserModuleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
