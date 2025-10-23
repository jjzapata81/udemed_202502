import { inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Photo, UserResponse } from '../interfaces/user-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);
  private galleryItemsSignal = signal<Photo[]>([]);
  public galleryItems = this.galleryItemsSignal.asReadonly();

  saveImage(userId: string, url: string): Observable<void> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});

    const body = { userId: userId, url: url };
    
    return this.http.post<Photo>('http://localhost:3000/api/v1/gallery/add', body, { headers })
      .pipe(
        map(response => {
          const image: Photo = {
            id: response.id,
            url: response.url,
            comments: response.comments || []
          };
          this.galleryItemsSignal.update(items => [...items, image]);
          return;
        }),
        catchError((error) => {
          return throwError(() => new Error(
            error.error?.message || error.message || 'Error al guardar la imagen'
          ));
        })
      );
  }

  getGallery(userId: string): Observable<Photo[]> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});

    return this.http.get<Photo[]>(`http://localhost:3000/api/v1/gallery/${userId}`, { headers })
      .pipe(
        map(response => {
          this.galleryItemsSignal.set(response);
          return response;
        }),
        catchError((error) => {
          return throwError(() => new Error(
            error.error?.message || error.message || 'Error al obtener la galeria'
          ));
        })
      );
  }

  findByUsername(username: string): Observable<UserResponse[]> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({'Authorization': `Bearer ${token}`});

    return this.http.get<UserResponse>(`http://localhost:3000/api/v1/user/username/${username}`, { headers })
      .pipe(
        map(user => [user]),
        catchError((error) => {
          return throwError(() => new Error(
            error.error?.message || error.message || 'Error al buscar el usuario'
          ));
        })
      );
  }

  findAll() {
    //throw new Error('Method not implemented.');
  }

  update(userId:string, user:Partial<User>) {

  }
  
}
