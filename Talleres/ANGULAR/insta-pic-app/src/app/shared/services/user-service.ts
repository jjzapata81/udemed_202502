import { inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { UploadImageResponse } from '../interfaces/login-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);
  router = inject(Router);

  private apiUrl = 'http://localhost:3000/api/v1/gallery';

    saveImage(userId: string, imageFile: File) {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('No hay token disponible. El usuario no está autenticado.');
      return of({ success: false, message: 'Usuario no autenticado' });
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('file', imageFile);

    return this.http.post<UploadImageResponse>(`${this.apiUrl}/upload`, formData, { headers }).pipe(
      map((response) => {
        if (response.success) {
          console.log('Imagen subida correctamente:', response.imageUrl);
          this.router.navigate(['/home']);
        }
        return response;
      }),
      catchError((error) => {
        console.error('Error al subir imagen:', error);
        return of({ success: false, message: 'No se pudo subir la imagen' });
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
