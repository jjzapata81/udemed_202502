import { Injectable, signal, inject } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { UploadImageRequest, UploadImageResponse, ApiError } from '../interfaces/upload-image';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user = signal<User | null>(null);
  private http = inject(HttpClient);
  private readonly API_BASE_URL = 'http://localhost:3000/api/v1';


  saveImage(userId: string, url: string): Observable<UploadImageResponse> {
    const token = sessionStorage.getItem('token');
    
    if (!token) {
      return throwError(() => ({ message: 'No token found', status: 401 }));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const uploadData: UploadImageRequest = {
      userId,
      url
    };

    return this.http.post<UploadImageResponse>(
      `${this.API_BASE_URL}/image`,
      uploadData,
      { headers }
    ).pipe(
      catchError((error) => {
        console.error('Error uploading image:', error);
        return throwError(() => ({
          message: error.error?.message || 'Error uploading image',
          status: error.status || 500
        }));
      })
    );
  }

  getUser(username:string){
    let userString = localStorage.getItem(username)
    if(userString){
      this.user.set(JSON.parse(userString) as User)
    }
    return this.user;
  
  }

  /*getUser2(){
    let token = sessionStorage.getItem('token')
    if(userString){
      this.user.set(JSON.parse(userString) as User)
    }
    return this.user;
  
  }*/
  
}
