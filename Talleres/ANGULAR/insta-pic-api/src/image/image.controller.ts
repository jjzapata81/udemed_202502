import { Controller, Post, Body } from '@nestjs/common';
import { ImageService } from './image.service';
import { UploadImageDto } from './dto/upload-image.do';
import { AddComment } from './dto/add-comment';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  uploadImage(@Body() uploadImageDto: UploadImageDto): any {
    return this.imageService.uploadImage(uploadImageDto)
  }

  @Post('add/comment')
  addComment(@Body() comment:AddComment ){
    return this.imageService.addComment( comment)
  }
}
