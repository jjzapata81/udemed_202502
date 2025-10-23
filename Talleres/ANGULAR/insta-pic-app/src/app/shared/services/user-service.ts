import { inject, Injectable, signal } from '@angular/core';
import { User, UserApiResponse } from '../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtService } from './jwt-service';
import { catchError, map, Observable } from 'rxjs';
import { GalleryApiResponse, GalleryItem } from '../interfaces/gallery-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  jwtService = inject(JwtService);

  http = inject(HttpClient);

  saveImage(userId: string, url: string) {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.jwtService.getToken()}` });
    return this.http
      .post('http://localhost:3000/api/v1/gallery/add', { userId, url }, { headers })
      .pipe(
        map(() => {
          return { success: true };
        }),
        catchError((error) => {
          throw new Error(error.message);
        })
      );
  }

  getGallery(userId: string) {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.jwtService.getToken()}` });
    return this.http
      .get<GalleryApiResponse[]>(`http://localhost:3000/api/v1/gallery/${userId}`, { headers })
      .pipe(
        map((images) => {
          return images.map((image): GalleryItem => {
            return {
              id: image.id,
              url: image.url,
              comments: image.comments,
            };
          });
        }),
        catchError((error) => {
          throw new Error(error.message);
        })
      );
    // let galleryStr = localStorage.getItem(`${userId}_gallery`);
    // if (galleryStr) {
    //   return JSON.parse(galleryStr);
    // }
    // return [];
  }

  findAll(): Observable<User[]> {
    //throw new Error('Method not implemented.');
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.jwtService.getToken()}` });
    return this.http.get<UserApiResponse[]>('localhost:3000/api/v1/user', { headers }).pipe(
      map((users) => {
        return users.map((user) => {
          return {
            id: user.id,
            username: user.username,
            name: user.username,
            email: user.email,
          };
        });
      })
    );
  }

  update(userId: string, user: Partial<User>) {}
}
