import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
//import { TypeOrmModule } from '@nestjs/typeorm';
//import { ConfigModule } from '@nestjs/config';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PhotoModule,
    /* ConfigModule.forRoot({
              isGlobal: true, // Lo hace global
            }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin123',
      database: 'ejemplo_db',
      synchronize: true,
      autoLoadEntities:true,
      ssl:false
    }),*/
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
