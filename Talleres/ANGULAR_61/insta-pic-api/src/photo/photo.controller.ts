import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { UploadPhotoDto } from './dto/upload-photo.dto';
import { AddCommentDto } from './dto/add-comment.dto';

@Controller('v1/gallery')
export class PhotoController {

  constructor(private readonly photoService: PhotoService) {}

  @Post('add')
  uploadPhoto(@Body() uploadPhotoDto:UploadPhotoDto){

    return this.photoService.uploadPhoto(uploadPhotoDto);

  }

  @Post('comment/add')
  createComment(@Body() addCommentDto:AddCommentDto){
    return this.photoService.addComment(addCommentDto);
  }

  @Get(':userId')
  geByUser(@Param('userId') userId:string, @Query('page') page:string, @Query('pageSize') pageSize:string){
    return this.photoService.findByUserId(userId, +page||1, +pageSize||1000);
  }

}