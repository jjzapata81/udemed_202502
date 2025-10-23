import { Injectable, inject } from '@angular/core';
import { User } from '../interfaces/user';
import { v4 as uuidv4 } from 'uuid';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ImageUploadDto, ImageUploadResponse } from '../interfaces/login-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api/v1';

  saveImage(userId: string, url: string): Observable<ImageUploadResponse> {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return of({ success: false, message: 'No hay token de sesión. Inicia sesión.' });
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const payload: ImageUploadDto = { userId, url };

    return this.http
      .post<any>(`${this.baseUrl}/gallery/add`, payload, { headers })
      .pipe(
        map((api) => {
          // Normalizamos posibles formas del backend
          // Intentamos leer id/url/userId en data o a primer nivel
          const id = api?.data?.id ?? api?.id;
          const u = api?.data?.url ?? api?.url;
          const uid = api?.data?.userId ?? api?.userId;

          if (api?.success) {
            return { success: true, id, url: u, userId: uid } as ImageUploadResponse;
          }
          return { success: false, message: api?.message ?? 'No se pudo guardar la imagen' };
        }),
        catchError((error) => {
          const msg = error?.error?.message ?? 'Error al guardar la imagen';
          return of({ success: false, message: msg });
        })
      );
  }

  getGallery(userId: string) {
    let galleryStr = localStorage.getItem(`${userId}_gallery`);
    if (galleryStr) {
      return JSON.parse(galleryStr);
    }
    return [];
  }

  findAll() {
    //throw new Error('Method not implemented.');
  }

  update(userId: string, user: Partial<User>) {

  }
  
}
