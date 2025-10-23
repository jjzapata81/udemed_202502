import { inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtService } from './jwt-service';
import { map, Observable } from 'rxjs';
import { Photo } from '../interfaces/user-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  router = inject(Router);
  jwtService = inject(JwtService)

  saveImage(userId:string, url:string): Observable<{success: boolean, photo?: Photo; message?: string}> {
    let token = this.jwtService.getToken();
    let headers = new HttpHeaders({Authorization: `Bearer ${token}`});
    let body = {userId, url};

    return this.http.post<Photo>('http://localhost:3000/api/v1/gallery/add', body, { headers }).pipe(
      map((photo) => {
        return { success: true, photo };
      })
    );
  }

  /*  this.http.post(`${url}`, { userId, url }, {headers})

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
  }*/

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
