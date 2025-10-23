import { inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';
import { LoginRespose, LoginServiceResponse, SignUpResponse } from '../interfaces/login-response';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { JwtService } from './jwt-service';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  http = inject(HttpClient);
  jwtService = inject(JwtService);

  isLoged = signal(false);

  constructor() {
    this.verifyLoggedUser();  // Verifica el estado de autenticación al crear la instancia
  }

  login(user: User): Observable<LoginRespose> { //espera un observable de LoginRespose
    return this.http.post<LoginServiceResponse>('http://localhost:3000/api/v1/auth/login', user).pipe( // Realiza la petición POST al endpoint de login
      map((response) => { // Mapea la respuesta del servidor
        sessionStorage.setItem('token', response.token); // Guarda el token en sessionStorage si la respuesta es OK
        this.verifyLoggedUser();  // Actualiza el estado de autenticación
        return {
          success: response.success // Retorna un objeto LoginRespose indicando éxito
        };
      }),
      catchError((error) => { // Maneja errores en la petición
        return of({ success: false, message: 'Usuario o contraseña incorrectos' }); // Retorna un objeto LoginRespose indicando fallo
      })
    );

  }


  signUp(user: User): Observable<SignUpResponse> { // Espera un observable de SignUpResponse
    return this.http.post<any>('http://localhost:3000/api/v1/user', user).pipe( // Realiza la petición POST al endpoint de creación de usuario
      map((response) => { // Mapea la respuesta del servidor
        if (response.token) {  // Si hay un token en la respuesta
          sessionStorage.setItem('token', response.token); // Guarda el token en sessionStorage
          this.verifyLoggedUser(); // Actualiza el estado de autenticación
        }
        return { success: response.success, redirectTo: response.success ? 'home' : undefined } as SignUpResponse; // Retorna un objeto SignUpResponse
      }),
      catchError((error) => { // Maneja errores en la petición
        console.error('Error al crear el usuario:', error); // Loguea el error para depuración
        return of({ success: false, message: 'Error al crear el usuario' } as SignUpResponse); // Retorna un objeto SignUpResponse indicando fallo
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
