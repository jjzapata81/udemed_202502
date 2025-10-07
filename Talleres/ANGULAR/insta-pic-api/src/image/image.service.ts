import { Injectable } from '@nestjs/common';
import { UploadImageDto } from './dto/upload-image.dto';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddCommentDto } from './dto/add-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class ImageService {
  getGalleryByUserId(userId: string, page: number=1, pagesize: number=100) {
    //return this.imageRepository.findBy(
      //{user: {id: userId}}
   // )
      let skip = (page - 1) * pagesize;

    return this.imageRepository.find({
     /* where: [
        {id: {id: userId}},
        {user: {isActive: true}}]
      */
      where: {
        user: {id: userId, isActive: true}
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
          username: true
        }
      },
      order: {
        createdAt: 'DESC',
        comments: {
          createdAt: 'DESC'
        }
      },
      skip: skip,
      take: pagesize
    })
    
  }
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
