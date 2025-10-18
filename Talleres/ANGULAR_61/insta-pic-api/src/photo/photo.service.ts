/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UploadPhotoDto } from './dto/upload-photo.dto';
import { AddCommentDto } from './dto/add-comment.dto';
import { PhotoRepositoryService } from './repository/photo-repository.service';
import { CommentsRepositoryService } from './repository/comments-repository.service';

@Injectable()
export class PhotoService {
  constructor(
    private photoRep: PhotoRepositoryService,
    private commentRep: CommentsRepositoryService
  ) {}

  uploadPhoto(uploadPhotoDto: UploadPhotoDto) {
    const photoEntity = this.photoRep.create(uploadPhotoDto);
    return this.photoRep.save(photoEntity);
  }

  addComment(addCommentDto: AddCommentDto) {
    return this.commentRep.create(addCommentDto);
  }

  findByUserId(userId: string) {
    return this.photoRep.findAll(userId);
  }
}
