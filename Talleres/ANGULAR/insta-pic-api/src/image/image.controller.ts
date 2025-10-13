import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ImageService } from './image.service';
import { UploadImageDto } from './dto/upload-image.dto';
import { AddCommentDto } from './dto/add-comment.dto';
import { AuthGuard } from 'src/no-spec/security/auth/auth.guard';

@Controller('v1/image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}
  @UseGuards(AuthGuard)
  @Post()
  uploadImage(@Body() uploadImageDto: UploadImageDto) {
    console.log(uploadImageDto);
    return this.imageService.uploadImage(uploadImageDto);
  }

  @Post('add/comment')
  addComment(@Body() addCommentDto: AddCommentDto) {
    return this.imageService.addComment(addCommentDto);
  }
  
  deleteImage(){

  }

  deleteComment(){

  }
  @Get("gallery/:id")
  getGalleryByUserId(@Param("id") userId:string, @Query("page") page:string, @Query("pagesize") pagesize:number){
    console.log(page, pagesize);
    return this.imageService.getGalleryByUserId(userId, +page, +pagesize);

  }
}
