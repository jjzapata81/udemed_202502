import { Body, Controller, Post } from '@nestjs/common';
import { ImageService } from './image.service';
import { UploadImageDto } from './dto/upload_image.dto';
import { AddComment } from './dto/add-comment.dto';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  uploadImage(@Body() uploadImageDto: UploadImageDto) {
    return this.imageService.uploadImage(uploadImageDto);
  }

  @Post('add/comment')
  addComment(@Body() comment:AddComment){ {
    return this.imageService.addComment(comment);
  }

}}
