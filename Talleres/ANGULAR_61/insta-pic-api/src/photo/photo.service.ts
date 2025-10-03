import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadPhotoDto } from './dto/upload-photo.dto';
import { Comment } from './entities/comment.entity';
import { AddCommentDto } from './dto/add-comment';

@Injectable()
export class PhotoService {
	constructor(
		@InjectRepository(Photo)
		private photoRepository: Repository<Photo>,
		@InjectRepository(Comment)
		private commentRepository: Repository<Comment>
	) {
	}

	uploadPhoto(uploadPhoto: UploadPhotoDto) {
		const photoEntity = this.photoRepository.create(
			{
				url: uploadPhoto.url,
				user: {
					id: uploadPhoto.userId
				}
			}
		);
		return this.photoRepository.create();
	}


	addComment(addCommentDto: AddCommentDto) {
		const commentEntity = this.commentRepository.create(
			{
				message: addCommentDto.message,
				user: { id: addCommentDto.userId },
				photo: { id: addCommentDto.photoId }
			}
		);
		return this.commentRepository.save(commentEntity);
	}

	findByUserId(userId: string) {
		return this.photoRepository.findBy(
			{
				user: { id: userId, isActive: true }
			}
		);
	}
}
