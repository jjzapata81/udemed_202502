import { inject, Injectable, signal } from '@angular/core';
import { User, CreateUserRequest } from '../interfaces/user';
import { LoginRespose, LoginServiceResponse, SignUpResponse, CreateUserResponse } from '../interfaces/login-response';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

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


    onSignUp(user: User): Observable<SignUpResponse> {
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
                        this.verifyLoggedUser();
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
