import { inject, Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Photo } from '../interfaces/user-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  jwtService = inject

  saveImage(userId:string, url:string){

    const galleryItem = {
      id: uuidv4(),
      url:url,
      comments:[]
    }
    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
    this.http.post<Photo>(`${url}`, { userId, url }, {headers}).pipe(
      map(response => {

      })
    )


    // let galleryStr = localStorage.getItem(`${userId}_gallery`);

    // if(galleryStr){
    //   let galleryItems = JSON.parse(galleryStr);
    //   galleryItems.push(galleryItem)
    //   localStorage.setItem(`${userId}_gallery`, JSON.stringify(galleryItems));
    //   return;
    // }

    // const galleryItems = [galleryItem];
    // localStorage.setItem(`${userId}_gallery`, JSON.stringify(galleryItems));
  }

  getGallery(userId:string){


    let galleryStr = localStorage.getItem(`${userId}_gallery`);
    if(galleryStr){
      return JSON.parse(galleryStr);
    }
    return [];

  }

  findAll() {
    //throw new Error('Method not implemented.');
  }

  update(userId:string, user:Partial<User>) {

  }
}
