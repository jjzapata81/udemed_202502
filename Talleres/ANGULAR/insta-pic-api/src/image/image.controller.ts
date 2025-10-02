import { Body, Controller, Post } from '@nestjs/common';
import { ImageService } from './image.service';
import { UploadImageDto } from './dto/upload-image.dto';
import { AddCommentDto } from './dto/add.comment.dto';


@Controller('v1/image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  uploadImage(@Body() uploadImageDto: UploadImageDto) {
    return this.imageService.uploadImage(uploadImageDto);
  }

  @Post('add/comment')
  addComment(@Body() Comment: AddCommentDto) {
    return this.imageService.addComment(Comment);
  }
}
