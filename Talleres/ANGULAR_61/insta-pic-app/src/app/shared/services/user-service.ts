import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { getHeaders } from '../utils/utility';
import { GalleryItem } from '../interfaces/gallery-item';
import { UserResponse } from '../interfaces/user-response';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient)

  saveImage(userId:string, url:string){
    return this.http.post('http://localhost:3000/api/v1/gallery/add', {userId, url}, getHeaders);
  }

  getGallery(userId:string){
    return this.http.get<GalleryItem[]>(`http://localhost:3000/api/v1/gallery/${userId}`, getHeaders);
  }

  findById(userId:string){
    return this.http.get<UserResponse>(`http://localhost:3000/api/v1/user/${userId}`, getHeaders);
  }

  findAll() {
    return this.http.get<UserResponse[]>(`http://localhost:3000/api/v1/user`, getHeaders);
  }

  update(userId:string, user:Partial<User>) {
    return this.http.patch<User>(`http://localhost:3000/api/v1/user/${userId}`, user, getHeaders);
  }

  getFollowers(userId:string){
    return this.http.get<User[]>(`http://localhost:3000/api/v1/user/find/followers`, getHeaders);
  }
}
