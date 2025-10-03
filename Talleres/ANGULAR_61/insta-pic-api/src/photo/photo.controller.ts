import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { UploadPhotoDto } from './dto/upload-photo.dto';
import { AddCommentDto } from './dto/add-comment.dto';

@Controller('v1/gallery')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

    @Post('add')
    uploadPhoto(@Body() uploadPhotoDto: UploadPhotoDto){

    return this.photoService.uploadPhoto(uploadPhotoDto);   
   }

   @Post('comment/add')
   AddCommnet(@Body() addCommentDto: AddCommentDto){
    return this.photoService.addComment(addCommentDto)
   }

   @Get(':userId')
   getByUser(@Param('userId')  userId:string){
    return this.photoService.findByUserId(userId)
   }

}


