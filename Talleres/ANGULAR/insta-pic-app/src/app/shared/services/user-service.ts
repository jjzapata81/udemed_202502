import { Injectable, signal, inject } from '@angular/core';
import { User, UploadImageDto } from '../interfaces/user';
import { UploadImageResponse } from '../interfaces/user-response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);

  saveImage(userId: string, url: string): Observable<UploadImageResponse> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const uploadData: UploadImageDto = {
      userId: userId,
      url: url
    };

    return this.http.post<UploadImageResponse>('http://localhost:3000/api/v1/image', uploadData, { headers }).pipe(
      map(response => {
        return response;
      }),
      catchError((error) => {
        console.error('Error al subir imagen:', error);
        let errorMessage = 'Error al subir la imagen';
        
        if (error.status === 401) {
          errorMessage = 'No autorizado. Inicia sesión nuevamente';
        } else if (error.status === 400) {
          errorMessage = 'Datos de imagen inválidos';
        } else if (error.status === 500) {
          errorMessage = 'Error interno del servidor';
        }
        
        throw new Error(errorMessage);
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
