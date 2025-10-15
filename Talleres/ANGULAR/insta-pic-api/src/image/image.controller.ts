import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ImageService } from './image.service';
import { UploadImageDto } from './dto/upload-image.dto';
import { AddCommentDto } from './dto/add.comment.dto';
import { AuthGuard } from 'src/security/auth/auth/auth.guard';


@Controller('v1/image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @UseGuards(AuthGuard)
  @Post()
  uploadImage(@Body() uploadImageDto: UploadImageDto) {
    return this.imageService.uploadImage(uploadImageDto);
  }

  @Post('add/comment')
  addComment(@Body() Comment: AddCommentDto) {
    return this.imageService.addComment(Comment);
  }

  @Get('gallery/:id')
  getGalleryByUserId(@Param('id') userid: string, @Query('page') page:string, @Query('pageSize') pageSize:string ) {
    return this.imageService.getGalleryByUserId(userid, +page|| 1, +pageSize|| 100);
  }

}
