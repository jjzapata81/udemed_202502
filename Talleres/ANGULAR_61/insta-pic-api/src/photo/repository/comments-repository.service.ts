/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { AddCommentDto } from '../dto/add-comment.dto';
import { PhotoRepositoryService } from './photo-repository.service';
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class CommentsRepositoryService {

    constructor(private photoRep:PhotoRepositoryService){}

  create(addCommentDto: AddCommentDto) {
    const photo = this.photoRep.findOne(addCommentDto.photoId);
    photo?.comments.push({
        id:uuidv4(),
        createdAt: new Date(),
        message:addCommentDto.message
    });
    return photo;

  }

}
