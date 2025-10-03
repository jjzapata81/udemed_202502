import { Injectable } from '@nestjs/common';
import { UploadPhotoDto } from './dto/upload-Photo.dto';
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddCommentDto } from './dto/add-comment.dto';

@Injectable()
export class PhotoService {
    
  constructor(
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  uploadPhoto(uploadPhotoDto: UploadPhotoDto) {
    let PhotoEntity =this.photoRepository.create({...uploadPhotoDto,user: { id: uploadPhotoDto.userId}});
    return this.photoRepository.save(PhotoEntity);
  }

   addComment(AddCommentDto: AddCommentDto) {
    const commentEntity = this.commentRepository.create(
      {
        message: AddCommentDto.message,
        user: {id:AddCommentDto.userId},
        photo: {id:AddCommentDto.photo}
      }
    )
    return this.commentRepository.save(commentEntity);
  }

  findByUserId(userId: string) {
    /*return this.photoRepository.findBy(
        {
            user: {id:userId, isActive:true}
        }
    );*/
    return this.photoRepository.find(
        {
            where:{
                user:{id:userId, isActive:true}
            },
            relations:{
                comments:true,
                user:true
            },
            select:{
                id:true,
                url:true,
                createdAt:true,
                user:{username:true, id:true}
            }
        }
    )
}

}