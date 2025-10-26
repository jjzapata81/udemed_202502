import { inject, Injectable, signal } from '@angular/core';
import { User, CreateUserRequest } from '../interfaces/user';
import { LoginResponse, LoginServiceResponse, SignUpResponse, CreateUserResponse } from '../interfaces/login-response';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  http = inject(HttpClient);

  isLogged = signal(false);

  constructor(){
    this.verifyUserLogged();
  }

  login(user: User): Observable<LoginResponse> {
    let body = {
      username:user.username,
      password:user.password
    }
   // return this.http.post<LoginResponse>('http://localhost:3000/api/v1/auth/login', body);


    return this.http.post<LoginServiceResponse>('http://localhost:3000/api/v1/auth/login', body)
      .pipe(
        map((response)=>{
          sessionStorage.setItem('userLogged', user.username);
          sessionStorage.setItem('token', response.token);
          if (response.userId) {
            sessionStorage.setItem('userId', response.userId);
          }
          return { success: response.success, redirectTo: "home" };
        }),
        catchError(() => [
          {success:false}
        ])
      );

    /*let userSrt = localStorage.getItem(user.username)

    if (userSrt && user.password === JSON.parse(userSrt)['password']) {
      sessionStorage.setItem('userLogged', user.username);
      this.verifyUserLogged();
      return { success: true, redirectTo: "home" };
    }

    return { success: false };*/

  }

  signUp(user: User): Observable<SignUpResponse> {
    const createUserRequest: CreateUserRequest = {
      username: user.username,
      password: user.password,
      email: user.email,
      name: user.name
    };

    return this.http.post<CreateUserResponse>('http://localhost:3000/api/v1/user', createUserRequest)
      .pipe(
        map((response) => {
          if (response.success && response.token) {
            // Save token in sessionStorage
            sessionStorage.setItem('token', response.token);
            sessionStorage.setItem('userLogged', user.username);
            this.verifyUserLogged();
            return { success: true, redirectTo: 'home' };
          }
          return { success: false, message: response.message || 'Error al crear el usuario' };
        }),
        catchError((error) => {
          console.error('Error creating user:', error);
          let errorMessage = 'Error al crear el usuario';
          
          if (error.error?.message) {
            errorMessage = error.error.message;
          } else if (error.status === 400) {
            errorMessage = 'Datos de usuario inválidos';
          } else if (error.status === 409) {
            errorMessage = 'El usuario ya existe';
          } else if (error.status === 500) {
            errorMessage = 'Error interno del servidor';
          }
          
          return of({ success: false, message: errorMessage });
        })
      );
  }

  private verifyUserLogged(){
    this.isLogged.set(!!sessionStorage.getItem('userLogged'))
  }


  logout(){
    sessionStorage.clear();
    this.verifyUserLogged();
  }

  getUserLogged(){

    if(!!sessionStorage.getItem('userLogged')){
      return {
        username:sessionStorage.getItem('userLogged')!,
        userId: sessionStorage.getItem('userId')
      }
    }
    return {
      username:'Bienvenido',
      userId: null
    }
  }


  

}
