import { inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';
import { LoginResponse, LoginServiceResponse, SignUpResponse } from '../interfaces/login-response';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';

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

  signUp(user:User):SignUpResponse {

    if (localStorage.getItem(user.username)) {
      return{ success:false, message:'Usuario ya existe' };
    }
    user.gallery=[];
    localStorage.setItem(user.username, JSON.stringify(user));
    sessionStorage.setItem('userLogged', user.username);
    this.verifyUserLogged();
    return {success:true, redirectTo:'home'}

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
        username:sessionStorage.getItem('userLogged')!
      }
    }
    return {
      username:'Bienvenido'
    }
  }


  

}
