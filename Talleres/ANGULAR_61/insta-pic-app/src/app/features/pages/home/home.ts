import { Component, inject } from "@angular/core";
import { RouterLink, Router } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
    selector:'app-home',
    imports:[RouterLink, CommonModule],
    templateUrl:'./home.html',
    styleUrl:'./home.css'
})
export class Home{

    title = 'Bienvenido a InstaPic';
    router = inject(Router);
    
    user = {
        username: '',
        isLoggedIn: false
    };

    constructor() {
        this.checkUserSession();
        setTimeout(() => {
            console.log('Estado final del usuario:', this.user);
        }, 100);
    }

    checkUserSession() {
        console.log('Verificando sesión de usuario...');    
        const userData = localStorage.getItem('currentUser');
        console.log('Datos del usuario:', userData);
        
        if (userData) {
            try {
                const parsedUser = JSON.parse(userData);
                console.log('Usuario parseado:', parsedUser);
                
                this.user = {
                    username: parsedUser.username || '',
                    isLoggedIn: true
                };
                
                console.log('Usuario actual:', this.user);
            } catch (error) {
                console.error('Error al parsear datos del usuario:', error);
                this.user = {
                    username: '',
                    isLoggedIn: false
                };
            }
        } else {
            console.log('No hay datos de usuario en localStorage');
            this.user = {
                username: '',
                isLoggedIn: false
            };
        }
    }
    testLogin() {
        this.user = {
            username: 'UsuarioTest',
            isLoggedIn: true
        };
        console.log('Login de test activado:', this.user);
    }
}
