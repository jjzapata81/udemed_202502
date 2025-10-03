import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  controllers: [TypeOrmModule.forFeature([Photo,])
  ,PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
