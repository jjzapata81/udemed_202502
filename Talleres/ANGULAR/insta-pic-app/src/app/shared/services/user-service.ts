import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { UploadImageResponse } from '../interfaces/user-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  router = inject(Router);

  // URL base del backend (ajústala según tu API)
  private apiUrl = 'http://localhost:3000/api/v1/gallery';

  saveImage(userId: string, imageFile: File) {
    // 1️⃣ Recuperar el token del sessionStorage
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('No hay token disponible. El usuario no está autenticado.');
      return of({ success: false, message: 'Usuario no autenticado' });
    }

    // 2️⃣ Crear los headers con el token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // 3️⃣ Crear el formulario (FormData) para enviar la imagen
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('file', imageFile);

    // 4️⃣ Consumir el API de subida
    return this.http.post<UploadImageResponse>(`${this.apiUrl}/upload`, formData, { headers }).pipe(
      map((response) => {
        if (response.success) {
          console.log('Imagen subida correctamente:', response.imageUrl);
          // Redireccionamos si quieres que el usuario vea su galería
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

  getGallery(userId: string) {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${this.apiUrl}/${userId}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error al consultar la galería:', error);
        return of([]); // devolvemos un array vacío si falla
      })
    );
  }

  findAll() {
    //throw new Error('Method not implemented.');
  }

  update(userId: string, user: Partial<User>) {}
}
