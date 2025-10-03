import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { UploadPhotoDto } from './dto/upload-photo.dto';

@Controller('v1/gallery')
export class PhotoController {
	constructor(private readonly photoService: PhotoService) { }

	@Post('add')
	uploadPhoto(@Body() uploadPhotoDto: UploadPhotoDto) {
		return this.photoService.uploadPhoto(uploadPhotoDto);
	}

	@Post('comment/add')
	createComment() {

	}

	@Get(':userid')
	getByUser(@Param('userId') userId: string) {
		return this.photoService.findByUserId(userId);
	}
}
