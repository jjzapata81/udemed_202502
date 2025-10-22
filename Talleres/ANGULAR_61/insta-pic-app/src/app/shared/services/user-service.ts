import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { User } from '../interfaces/user';
import { UploadPhotoResponse } from '../interfaces/photo-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);

  saveImage(userId: string, url: string): Observable<UploadPhotoResponse> {
    const token = sessionStorage.getItem('token');
    
    if (!token) {
      return of({ success: false, message: 'No hay sesión activa' });
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    
    return this.http.post<UploadPhotoResponse>('http://localhost:3000/api/v1/gallery/add', 
      { userId, url }, 
      { headers }
    ).pipe(
      map(response => ({
        success: true,
        message: 'Foto subida correctamente'
      })),
      catchError((error) => {
        const message = error.error?.message || 'Error al subir la foto';
        return of({ success: false, message });
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
}
