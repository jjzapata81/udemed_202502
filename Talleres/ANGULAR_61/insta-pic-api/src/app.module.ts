import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { PhotoModule } from './photo/photo.module';
import { Photo } from './photo/entities/photo.entity';
import { Comment } from './photo/entities/comment.entity';

@Module({
  imports: [
    AuthModule, 
    UserModule,
    PhotoModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      autoLoadEntities:true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
