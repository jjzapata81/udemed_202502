/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
//import { TypeOrmModule } from '@nestjs/typeorm';
//import { Photo } from './entities/photo.entity';
//import { Comment } from './entities/comment.entity';
import { PhotoRepositoryService } from './repository/photo-repository.service';
import { CommentsRepositoryService } from './repository/comments-repository.service';
import { UserModule } from 'src/user/user.module';

@Module({
  //imports:[TypeOrmModule.forFeature([Photo, Comment])],
  imports:[UserModule],
  controllers: [PhotoController],
  providers: [PhotoService, PhotoRepositoryService, CommentsRepositoryService],
})
export class PhotoModule {}
