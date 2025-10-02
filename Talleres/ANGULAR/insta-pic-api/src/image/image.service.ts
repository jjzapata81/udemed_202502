import { Injectable } from '@nestjs/common';
import { UploadImageDto } from './dto/upload-image.dto';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddCommentDto } from './dto/add-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,

    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  uploadImage(uploadImageDto: UploadImageDto) {
    const imageEntity = this.imageRepository.create({
      ...uploadImageDto,
      user: { id: uploadImageDto.userId },
    });
    return this.imageRepository.save(imageEntity);
  }

  addComment(addCommentDto: AddCommentDto) {
    const commentEntity = this.commentRepository.create({
      ...addCommentDto,
      user: { id: addCommentDto.userId },
      image: { id: addCommentDto.imageId },
    });
    return this.commentRepository.save(commentEntity);
  }
}
