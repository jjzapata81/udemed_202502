import { Injectable, signal, inject } from '@angular/core';
import { User, UploadImageDto, UpdateUserDto } from '../interfaces/user';
import { UploadImageResponse, GalleryImage, SearchUser, UpdateUserResponse } from '../interfaces/user-response';
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

  getGallery(userId: string, page: number = 1, pageSize: number = 100): Observable<GalleryImage[]> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<GalleryImage[]>(`http://localhost:3000/api/v1/image/gallery/${userId}`, { 
      headers,
      params: {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }).pipe(
      map(response => {
        return response;
      }),
      catchError((error) => {
        console.error('Error al obtener galería:', error);
        let errorMessage = 'Error al obtener la galería';
        
        if (error.status === 401) {
          errorMessage = 'No autorizado. Inicia sesión nuevamente';
        } else if (error.status === 404) {
          errorMessage = 'Usuario no encontrado';
        } else if (error.status === 500) {
          errorMessage = 'Error interno del servidor';
        }
        
        throw new Error(errorMessage);
      })
    );
  }

  findAll(): Observable<SearchUser[]> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<SearchUser[]>('http://localhost:3000/api/v1/user', { headers }).pipe(
      map(response => {
        return response;
      }),
      catchError((error) => {
        console.error('Error al obtener usuarios:', error);
        let errorMessage = 'Error al obtener usuarios';
        
        if (error.status === 401) {
          errorMessage = 'No autorizado. Inicia sesión nuevamente';
        } else if (error.status === 500) {
          errorMessage = 'Error interno del servidor';
        }
        
        throw new Error(errorMessage);
      })
    );
  }

  update(userId: string, updateData: UpdateUserDto): Observable<UpdateUserResponse> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.patch<UpdateUserResponse>(`http://localhost:3000/api/v1/user/${userId}`, updateData, { headers }).pipe(
      map(response => {
        return response;
      }),
      catchError((error) => {
        console.error('Error al actualizar usuario:', error);
        let errorMessage = 'Error al actualizar el usuario';
        
        if (error.status === 401) {
          errorMessage = 'No autorizado. Inicia sesión nuevamente';
        } else if (error.status === 400) {
          errorMessage = 'Datos de usuario inválidos';
        } else if (error.status === 404) {
          errorMessage = 'Usuario no encontrado';
        } else if (error.status === 500) {
          errorMessage = 'Error interno del servidor';
        }
        
        throw new Error(errorMessage);
      })
    );
  }
  
}
