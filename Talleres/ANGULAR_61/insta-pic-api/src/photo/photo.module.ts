import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Comment } from './entities/comment.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Photo, Comment])],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
