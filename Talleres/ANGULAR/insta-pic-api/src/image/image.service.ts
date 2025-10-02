import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UploadImageDto } from './dto/upload-image.dto';
import { Image } from './entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { AddComment } from './dto/add-comment.dto';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async uploadImage(uploadImageDto: UploadImageDto) {
    console.log(uploadImageDto);
    try {
      let imageEntity = this.imageRepository.create({
        ...uploadImageDto,
        user: { id: uploadImageDto.userId },
      });
      return this.imageRepository.save(imageEntity);
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  addComment(comment: AddComment) {
    const commentEntity = this.commentRepository.create({
      ...comment,
      user: { id: comment.userId },
      imagen: { id: comment.imageId },
    });
    return this.commentRepository.save(commentEntity);
  }
}
