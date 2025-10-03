import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import {   env } from 'process';  
import { PhotoModule } from './photo/photo.module';



@Module({
  imports: [AuthModule, UserModule, PhotoModule,
      TypeOrmModule.forRoot({
      type: 'postgres',
      host:process.env.DB_HOST,
      port:+process.env.DB_PORT!,
      username: 'postgres.cniiadpnetizpktfmvge',
      password: 'ZY7eE4ymxZ7YQMh5',
      database: 'postgres',
      entities: [User],
      synchronize: true,
      autoLoadEntities: true,
    }),
      
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}
