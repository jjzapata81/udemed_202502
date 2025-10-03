import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { uploadPhotoDto } from './Dto/upload-photo.dto'; 
import { AddCommentDto } from './Dto/add-commet.dto';
import { Photo } from './entities/photo.entity';
import { Comment } from './entities/comment.entity'; 

@Injectable()
export class PhotoService {

  constructor(
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) { }


  uploadPhoto(uploadPhotoDto: uploadPhotoDto) {

    const photoEntity = this.photoRepository.create(
      {
        url: uploadPhotoDto.url,
      
        user: { id: uploadPhotoDto.userId }
      },
    );
    
    return this.photoRepository.save(photoEntity); 
  }


  addComment(addCommentDto: AddCommentDto) {
    
    const commentEntity = this.commentRepository.create(
      {
        message: addCommentDto.message, 
        user: { id: addCommentDto.userId }, 
        photo: { id: addCommentDto.photoId }
      },
      
    );
    
    return this.commentRepository.save(commentEntity); 
  }


  findByUserId(userId: string) {
    return this.photoRepository.find({
      where: {
        
        user: { id: userId, isActive: true } 
      },
      relations: {
        comments: true,
        user: true
      },
      
      select: {
        id: true,
        url: true,
        createdAt: true,
        user: {
          id: true,
          username: true,
        },
      }
    }); 
  }
}
