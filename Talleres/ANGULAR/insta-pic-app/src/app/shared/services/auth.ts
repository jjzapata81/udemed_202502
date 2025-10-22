import { inject, Injectable, signal } from '@angular/core';
import { User, CreateUserDto } from '../interfaces/user';
import { LoginRespose, LoginServiceResponse, SignUpResponse, SignUpServiceResponse } from '../interfaces/login-response';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { JwtService } from './jwt-service';

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
    return this.http.post<LoginServiceResponse>('http://localhost:3000/api/v1/auth/login', user).pipe(
      map(response => {
        sessionStorage.setItem('token', response.token);
        this.verifyLoggedUser();
        return {
          success: response.success
        }
      }),
      catchError((error) => {
        return [{ success: false, message: 'Usuario o contraseña incorrectos' }];
      })
    );

  }


  signUp(user: CreateUserDto): Observable<SignUpResponse> {
    return this.http.post<SignUpServiceResponse>('http://localhost:3000/api/v1/user', user).pipe(
      map(response => {
        if (response.success) {
          sessionStorage.setItem('token', response.token);
          this.verifyLoggedUser();
          return {
            success: true,
            redirectTo: 'home'
          };
        }
        return {
          success: false,
          message: 'Error al crear el usuario'
        };
      }),
      catchError((error) => {
        console.error('Error en el registro:', error);
        let errorMessage = 'Error al crear el usuario';
        
        if (error.status === 400) {
          errorMessage = 'Los datos proporcionados no son válidos';
        } else if (error.status === 409) {
          errorMessage = 'El usuario ya existe';
        } else if (error.status === 500) {
          errorMessage = 'Error interno del servidor';
        }
        
        return [{ success: false, message: errorMessage }];
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
