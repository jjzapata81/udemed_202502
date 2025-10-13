import { Injectable } from '@nestjs/common';
import { UploadPhotoDto } from './dto/upload-photo.dto';
import { Repository } from 'typeorm';
import { Photo } from './entities/photo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddCommentDto } from './dto/add-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class PhotoService {
    

    constructor(
        @InjectRepository(Photo)
        private photoRepository: Repository<Photo>,
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>
    ) {

    }

    uploadPhoto(uploadPhotoDto: UploadPhotoDto) {
        const photoEntity = this.photoRepository.create(
            {
                url: uploadPhotoDto.url,
                user: { id: uploadPhotoDto.userId }
            }
        );
        return this.photoRepository.save(photoEntity);
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

    findByUserId(userId: string, page:number, pageSize:number) {
      /*return this.photoRepository.findBy(
        {
            user:{ id: userId, isActive:true}
        }
      );*/

      let skip = (page - 1) * pageSize;
      return this.photoRepository.find(
        {
            where:{
                user:{id:userId, isActive:true}
            },
            /*where:[
                {user:{id:userId}},
                {user:{isActive:true}}
            ],*/
            relations:{
                comments:true,
                user:true
            },
            select:{
                id:true,
                url:true,
                createdAt:true,
                user:{ username:true, id:true }
            },
            order:{
                createdAt:'DESC',
                comments:{createdAt:'DESC'}
            },
            take:pageSize,
            skip:skip
        }
      )
    }

}
