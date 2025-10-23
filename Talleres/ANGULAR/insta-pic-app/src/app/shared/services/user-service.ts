import { inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// The app's environment file in this project exposes SUPABASE constants,
// so we don't import a single `environment` object here. Use a local
// API base fallback. You can set `apiBase` in sessionStorage under
// 'apiBase' if you want to override it at runtime (useful for local dev).
const API_BASE_FALLBACK = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);

  saveImage(userId:string, url:string){
  const apiBase = sessionStorage.getItem('apiBase') ?? API_BASE_FALLBACK;
  const endpoint = `${apiBase}/v1/gallery/add`;

    const headers = new HttpHeaders({authorization: `Bearer ${sessionStorage.getItem('token')}`});

    this.http.post(endpoint, {
      userId: userId,
      url: url
    }, {headers: headers}).subscribe({
      next: () => {
      },
      error: (err) => {
        console.error('Error guardando imagen en la base de datos', err);
      }
    });

    const galleryItem = {
      id: uuidv4(),
      url: url,
      comments: []
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
