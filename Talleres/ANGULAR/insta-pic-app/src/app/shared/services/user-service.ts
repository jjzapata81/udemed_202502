import { inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { getHeaders } from '../utils/utility';
import { GalleryItem } from '../interfaces/gallery-item';
import { UserResponse } from '../interfaces/user-response';
import { Comment } from '../interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);

  saveImage(userId:string, url:string){
    return this.http.post('http://localhost:3000/api/v1/gallery/add', {userId, url}, getHeaders);
  }

  getGallery(userId:string){
    return this.http.get<GalleryItem[]>(`http://localhost:3000/api/v1/gallery/${userId}`, getHeaders);
  }

  findAll() {
    return this.http.get<UserResponse[]>(`http://localhost:3000/api/v1/user`, getHeaders)
  }

  findById(userId:string){
    return this.http.get<UserResponse>(`http://localhost:3000/api/v1/user/${userId}`, getHeaders);
  }

  update(userId:string, user:Partial<User>) {
    return this.http.patch(`http://localhost:3000/api/v1/user/${userId}`, user, getHeaders);
  }

  addComment(userId:string, comment:Comment){
    const body ={
      ...comment,
      userId
    }
    return this.http.post('http://localhost:3000/api/v1/gallery/comment/add', body, getHeaders);
  }
  
}
