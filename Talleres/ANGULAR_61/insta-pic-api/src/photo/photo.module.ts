import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoService } from './photo.sevice';
import { PhotoController } from './photo.controller';
import { Comment } from './entities/comment.entity';
import { Photo } from './entities/photo.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Photo, Comment])],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}