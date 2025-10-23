import { inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);

  saveImage(userId:string, url:string){

    const galleryItem = {
      id: uuidv4(),
      url:url,
      comments:[]
    }

    let galleryStr = localStorage.getItem(`${userId}_gallery`);

    if(galleryStr){
      let galleryItems = JSON.parse(galleryStr);
      galleryItems.push(galleryItem)
      localStorage.setItem(`${userId}_gallery`, JSON.stringify(galleryItems));
      return;
    }

    const galleryItems = [galleryItem];
    localStorage.setItem(`${userId}_gallery`, JSON.stringify(galleryItems));
  }

  getGallery(userId:string){
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
    return this.http.get<any>(`http://localhost:3000/api/v1/gallery/${userId}`,{headers}).pipe(
    );
    /*
    let galleryStr = localStorage.getItem(`${userId}_gallery`);
    if(galleryStr){
      return JSON.parse(galleryStr);
    }
    return [];*/

  }

  findAll() {
    //throw new Error('Method not implemented.');
  }

  update(userId:string, user:Partial<User>) {

  }

  uploadImage( userId:string , url: string){
    const token = sessionStorage.getItem('token');
    console.log(token)
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});
    return this.http.post(`http://localhost:3000/api/v1/gallery/add`, { userId, url },{headers}).pipe(
      map(response => {
      console.log(response)
      return response
    }),
    catchError(error=>{
      throw new Error('Se lanza un error')
    }
    ));
  }
}
