import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, of, tap, Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { SaveImageResponse, UploadedImage } from '../interfaces/image-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private router = inject(Router);

  saveImage(userId: string, url: string): Observable<SaveImageResponse> {
    if (!userId || !url) {
      return of({
        success: false,
        message: 'UserId y URL son obligatorios',
      });
    }

    try {
      // Obtener el token para autenticación
      const token = sessionStorage.getItem('token');
      if (!token) {
        return of({
          success: false,
          message: 'No hay sesión activa',
        });
      }

      const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

      return this.http
        .post<any>('http://localhost:3000/api/v1/gallery/add', { userId, url }, { headers })
        .pipe(
          map((response) => ({
            success: response?.success ?? true,
            message: response?.message || 'Imagen guardada correctamente',
          })),
          tap((response) => {
            if (response.success) {
              this.router.navigate(['home']);
            }
          }),
          catchError((error) => {
            console.error('Error al guardar la imagen:', error);
            return of({
              success: false,
              message: error?.error?.message || 'Error al guardar la imagen',
            });
          })
        );
    } catch (error) {
      console.error('Error al guardar la imagen:', error);
      return of({
        success: false,
        message: 'Error al procesar la solicitud',
      });
    }
  }

  getGallery(userId: string): Observable<UploadedImage[]> {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        return of([]);
      }

      const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

      return this.http
        .get<UploadedImage[]>(`http://localhost:3000/api/v1/gallery/${userId}`, { headers })
        .pipe(
          catchError((error) => {
            console.error('Error al obtener galería:', error);
            return of([]);
          })
        );
    } catch (error) {
      console.error('Error al obtener galería:', error);
      return of([]);
    }
  }

  findAll() {
    //throw new Error('Method not implemented.');
  }

  update(userId: string, user: Partial<User>) {}
}
