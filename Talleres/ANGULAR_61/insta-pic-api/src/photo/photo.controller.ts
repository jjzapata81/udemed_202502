import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { UploadImageDto } from './dto/upload-photo.dto';

@Controller('v1/gallery')
export class PhotoController {
	constructor(private readonly photoService: PhotoService) { }

	@Post('add')
	uploadPhoto(@Body() uploadPhotoDto: UploadImageDto) {
		return this.photoService.uploadPhoto(uploadPhotoDto);
	}

	@Post('comment/add')
	createComment(@Body() addCommentDto) {
		return this.photoService.addComment(addCommentDto);
	}

	@Get(':userid')
	getByUser(@Param('userid') userId: string) {
		return this.photoService.findByUserId(userId);
	}
}