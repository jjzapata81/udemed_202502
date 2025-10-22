import { Injectable, inject } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtService } from './jwt-service';
import { Photo } from '../interfaces/user-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  router = inject(Router);
  jwtService = inject(JwtService);

  saveImage(userId:string, url:string): Observable<{ success:boolean; photo?: Photo; message?: string }>{
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const body = { userId, url };

    return this.http.post<Photo>('http://localhost:3000/api/v1/gallery/add', body, { headers }).pipe(
      map((photo) => {
        return { success: true, photo };
      }),
      catchError((error) => {
        return [{ success: false, message: 'Error al guardar la imagen' }];
      })
    );
  }

  getGallery(userId:string): Observable<Photo[]> {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get<Photo[]>(`http://localhost:3000/api/v1/gallery/${userId}`, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching gallery:', error);
        return of([]);  // Return empty array on error
      })
    );
  }

  findAll() {
    //throw new Error('Method not implemented.');
  }

  update(userId:string, user:Partial<User>) {

  }
}
