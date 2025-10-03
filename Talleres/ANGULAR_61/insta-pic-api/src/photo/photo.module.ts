import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Photo } from './entities/photo.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Photo, Comment])],
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}