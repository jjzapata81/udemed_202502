import { inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';
import { LoginRespose, LoginServiceResponse, SignUpResponse, SignUpServiceResponse } from '../interfaces/login-response';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { JwtService } from './jwt-service';
import { API_BASE_URL } from '../../../environments/environment';
import { SignUpRequest } from '../interfaces/sign-up-request';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  http = inject(HttpClient);
  jwtService = inject(JwtService)

  isLoged = signal(false);

  constructor() {
    this.verifyLoggedUser();
  }

  login(user: User): Observable<LoginRespose> {
    return this.http.post<LoginServiceResponse>(`${API_BASE_URL}/auth/login`, user).pipe(
      map(response => {
        sessionStorage.setItem('token', response.token);
        this.verifyLoggedUser();
        return {
          success: response.success
        }
      }),
      catchError((error) => {
        const message = error?.error?.message || 'Usuario o contraseña incorrectos';
        return of({ success: false, message });
      })
    );

  }


  onSignUp(user: SignUpRequest): Observable<SignUpResponse> {
    return this.http.post<SignUpServiceResponse>(`${API_BASE_URL}/user`, user).pipe(
      map(response => {
        sessionStorage.setItem('token', response.token);
        this.verifyLoggedUser();
        return { success: response.success, redirectTo: 'home' };
      }),
      catchError(error => {
        const message = error?.error?.message || 'No fue posible registrar el usuario';
        return of({ success: false, message });
      })
    );
  }

  logout() {
    sessionStorage.clear();
    this.verifyLoggedUser();
  }

  getUserLogged():User {
    let user = this.jwtService.decodeToken();
    if (!user) return { username: 'unknown-user', id:'1', name:'no-user', url:'no-user', email:'no-user' };
    return {
      id: user.id,
      username: user.username,
      url: user.url,
      name:user.name,
      email:user.email
    }
  }

  isTokenExpired() {
    return this.jwtService.isTokenExpired();
  }

  private verifyLoggedUser() {
    this.isLoged.set(!!sessionStorage.getItem('token'))
  }

}
