import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PhotoService } from './photo.sevice';
import { UploadPhotoDto } from './dto/upload-Photo.dto';
import { AddCommentDto } from './dto/add-comment.dto';

@Controller('v1/photo')
export class PhotoController {
  constructor(private readonly PhotoService: PhotoService) {}

  @Post('add')
  uploadPhoto(@Body() uploadPhotoDto:UploadPhotoDto){
    return this.PhotoService.uploadPhoto(uploadPhotoDto)
  }

  @Post("comment/add")
  CreateComment(@Body() AddCommentDto:AddCommentDto){
    return this.PhotoService.addComment(AddCommentDto)
  }

  @Get(':userId')
  geByUser(@Param('userId') userId:string){
    return this.PhotoService.findByUserId(userId)
}

}

