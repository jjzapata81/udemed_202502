import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
//import { TypeOrmModule } from '@nestjs/typeorm';
//import { ConfigModule } from '@nestjs/config';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    AuthModule, 
    UserModule,
    ImageModule,
    /*ConfigModule.forRoot({
              isGlobal: true, // Lo hace global
            }),
      TypeOrmModule.forRoot({
      type: 'postgres',
      host:process.env.DBSB_HOST,
      port: +process.env.DBSB_PORT!,
      username: process.env.DBSB_USER,
      password: process.env.DBSB_PASSWORD,
      database: process.env.DBSB_DATABASE,
      autoLoadEntities:true,
      synchronize: true,
      ssl:false
    })*/
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
