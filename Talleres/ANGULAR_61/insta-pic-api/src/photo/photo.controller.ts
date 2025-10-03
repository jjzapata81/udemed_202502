import { Body, Controller, Post } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { uploadPhotoDto } from './Dto/upload-photo.dto';
import { AddCommentDto } from './Dto/add-commet.dto';

@Controller('photo')
export class PhotoController {
  
  constructor(private readonly photoService: PhotoService) {}

  @Post('add')
  uploadPhoto(@Body uploadPhotoDto:uploadPhotoDto){

    return this.photoService.uploadPhoto(uploadPhotoDto)
    
  }

  @Post('comment/add')
  createComment(@Body() AddCommentDto:AddCommentDto) {
    return this.photoService.addComment(AddCommentDto);
  }
  
  @Get(':userId')
  findByUserId(@Param('userId') userId: string) {
    return this.photoService.findAll(userId);
  }
  
}
