import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-1-us-east-2.pooler.supabase.com',
      port: 5432,
      username: 'postgres.ymnlcjxtwothirvjjrxb',
      password: 'iNVin94xayI4qJWa',
      database: 'postgres',
      entities: [User],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
