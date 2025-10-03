import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Comment } from './entities/comment.entity';

@Module({
	controllers: [PhotoController],
	imports: [TypeOrmModule.forFeature([Photo, Comment])],
	providers: [PhotoService],
})
export class PhotoModule { }
