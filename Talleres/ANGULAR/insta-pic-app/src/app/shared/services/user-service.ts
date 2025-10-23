import { inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { GalleryResponse } from '../interfaces/gallery';
import { UserResponse } from '../interfaces/user-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  saveImage(userId: string, url: string) {
    const token = sessionStorage.getItem('token');
    console.log('Token:', token);
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    console.log('Headers:', headers);
    return this.http
      .post('http://localhost:3000/api/v1/gallery/add', { userId, url }, { headers })
      .pipe(
        map((response) => {
          console.log('Imagen guardada en la galería:', response);
        })
      );
  }

  getGallery(userId: string): Observable<GalleryResponse[]> {
    // let galleryStr = localStorage.getItem(`${userId}_gallery`);
    // if (galleryStr) {
    //   return JSON.parse(galleryStr);
    // }
    // return [];

    const headers = new HttpHeaders({ Authorization: `Bearer ${sessionStorage.getItem('token')}` });

    return this.http
      .get<GalleryResponse[]>(`http://localhost:3000/api/v1/gallery/${userId}`, { headers })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  findAll() {
    return this.http.get<UserResponse[]>('http://localhost:3000/api/v1/user').pipe(
      map((response) => {
        console.log('Usuarios encontrados:', response);
        return response;
      })
    );
  }

  update(userId: string, user: Partial<User>) {}
}
