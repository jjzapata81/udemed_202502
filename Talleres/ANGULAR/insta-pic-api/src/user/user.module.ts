import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Image } from 'src/image/entities/image.entity';
import { Comment } from 'src/image/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Image, Comment])], // Vamos a utilizar este entidad dentro del modulo :)
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
