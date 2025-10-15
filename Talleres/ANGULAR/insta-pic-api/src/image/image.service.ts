import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';
import { UploadImageDto } from './dto/upload-image.dto';
import { Comment } from './entities/comment.entity';
import { AddCommentDto } from './dto/add.comment.dto';

@Injectable()
export class ImageService {

  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  uploadImage(uploadImageDto: UploadImageDto) {
    const image = this.imageRepository.create({
      ...uploadImageDto,
      user: { id: uploadImageDto.userId },
    });
    return this.imageRepository.save(image);
  }

  addComment(Comment: AddCommentDto) {
    const comment = this.commentRepository.create({
      ...Comment,
      user: { id: Comment.userId },
      image: { id: Comment.imageId },
    });
    return this.commentRepository.save(comment);
  }

  getGalleryByUserId(userid: string, page: number = 1, pageSize: number = 100) {

    let skip = (page - 1) * pageSize;

    return this.imageRepository.find({
      where: {
         user: { id: userid, isActive: true },
        },
      relations: {
        comments: true,
        user: true,
      },
      select: {
        id: true,
        url: true,
        createdAt: true,
        comments: true,
        user: {
          id: true,
          username: true,
        },
      },
      order: {
        createdAt: 'DESC',
        comments: {
          createdAt: 'DESC',
        },
      },
      skip: skip,
      take: pageSize,
    });
  }
}
