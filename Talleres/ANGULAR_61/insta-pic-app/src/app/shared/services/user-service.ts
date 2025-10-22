import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { API_BASE_URL } from '../../../environments/environment';
import { JwtService } from './jwt-service';
import { Comment, Photo, PhotoUploadResponse } from '../interfaces/user-response';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  private jwtService = inject(JwtService);

  saveImage(userId:string, url:string): Observable<Photo> {
    const token = this.jwtService.getToken();
    if(!token){
      return throwError(() => new Error('No existe un token activo'));
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.post<PhotoUploadResponse>(`${API_BASE_URL}/gallery/add`, { userId, url }, { headers }).pipe(
      map(response => this.mapPhotoResponse(response)),
      tap(photo => this.persistGallery(userId, photo)),
      catchError(error => {
        const message = error?.error?.message || 'No fue posible guardar la imagen';
        return throwError(() => new Error(message));
      })
    );
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

  private mapPhotoResponse(response: PhotoUploadResponse): Photo {
    const comments: Comment[] = response.comments ?? [];
    return {
      id: response.id,
      url: response.url,
      comments
    };
  }

  private persistGallery(userId: string, photo: Photo) {
    const key = `${userId}_gallery`;
    const galleryStr = localStorage.getItem(key);
    if (galleryStr) {
      const galleryItems: Photo[] = JSON.parse(galleryStr);
      galleryItems.push(photo);
      localStorage.setItem(key, JSON.stringify(galleryItems));
      return;
    }
    const galleryItems = [photo];
    localStorage.setItem(key, JSON.stringify(galleryItems));
  }
}
