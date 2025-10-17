import { inject, Injectable, signal } from '@angular/core';
import { User } from '../interfaces/user';
import { LoginRespose, LoginServiceResponse, SignUpResponse } from '../interfaces/login-response';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class Auth {

    http = inject(HttpClient);

    isLoged = signal(false);

    constructor() {
        this.verifyLoggedUser();
    }

    login(user: User): Observable<LoginRespose> {

        //return this.http.post<LoginServiceResponse>('http://localhost:3000/api/v1/auth/login', user)
        //.subscribe(response=>console.log(response))

        return this.http.post<LoginServiceResponse>('http://localhost:3000/api/v1/auth/login', user).pipe(
            map(response => {
                sessionStorage.setItem('userLogged', user.username);
                sessionStorage.setItem('token', response.token);
                this.verifyLoggedUser();
                return {
                    success: response.success
                }
            }),
            catchError((error) => {
                console.error('Error caught:', error);
                return [{ success: false, message: 'Usuario o contraseña incorrectos' }]; // Return an observable emitting an empty array as fallback
            })
        );
        /*let userStr = localStorage.getItem(user.username);
        
        if (userStr && user.password === JSON.parse(userStr).password) {
            return { success: true };
        }
        return { success: false, message: 'Usuario o contraseña incorrectos' };*/

    }


    onSignUp(user: User): SignUpResponse {

        let userStr = localStorage.getItem(user.username!);
        if (userStr) {
            return { success: false, message: 'Ya existe el Usuario' };
        }
        localStorage.setItem(user.username!, JSON.stringify(user));
        sessionStorage.setItem('userLogged', user.username);
        this.verifyLoggedUser();
        return { success: true, redirectTo: 'home' };
    }

    logout() {
        sessionStorage.clear();
        this.verifyLoggedUser();
    }

    getUserLogged() {
        if (sessionStorage.getItem('userLogged')) {
            return { username: sessionStorage.getItem('userLogged')! }
        }
        return { username: 'unknown-user' };
    }

    private verifyLoggedUser() {
        this.isLoged.set(!!sessionStorage.getItem('userLogged'))

    }

}
