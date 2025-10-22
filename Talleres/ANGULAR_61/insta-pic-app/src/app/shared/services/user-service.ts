import { inject, Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { SaveImageRequest, SaveImageResponse } from '../interfaces/photo-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);

  saveImage(userId: string, url: string): Observable<SaveImageResponse> {
    // Recuperar el token del sessionStorage
    const token = sessionStorage.getItem('token');

    if (!token) {
      return of({
        success: false,
        message: 'No se encontró el token de autenticación'
      });
    }

    // Configurar headers con el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const request: SaveImageRequest = {
      userId,
      url
    };

    return this.http.post<SaveImageResponse>('http://localhost:3000/api/v1/gallery/add', request, { headers }).pipe(
      map(response => {
        if (response.success) {
          return {
            success: true,
            message: 'Imagen guardada exitosamente',
            photo: response.photo
          };
        }
        return {
          success: false,
          message: response.message || 'Error al guardar la imagen'
        };
      }),
      catchError((error) => {
        let errorMessage = 'Error al guardar la imagen';
        if (error?.error?.message) {
          errorMessage = error.error.message;
        } else if (error?.message) {
          errorMessage = error.message;
        }
        return of({
          success: false,
          message: errorMessage
        });
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
