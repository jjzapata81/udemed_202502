/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from "uuid";
import { Photo } from '../entities/photo.entity';
import { UploadPhotoDto } from '../dto/upload-photo.dto';
import { UserReposotoryService } from 'src/user/repository/user-reposotory.service';

@Injectable()
export class PhotoRepositoryService {

  constructor(private userRepo:UserReposotoryService){}

  private repo: Photo[] = [];

  create(photo: UploadPhotoDto): Photo {
    const user = this.userRepo.findOne(photo.userId);
    return {
      ...photo,
      id: uuidv4(),
      user,
      createdAt: new Date(),
      comments:[]
    };
  }

  save(photo: Photo): Photo {
    this.repo.push(photo);
    return photo;
  }

  findAll(userId:string) {
    return this.repo.filter(photo=>photo.user.id===userId);
  }


  findOne(id: string) {
    return this.repo.find(photo => photo.id === id);
  }

}
