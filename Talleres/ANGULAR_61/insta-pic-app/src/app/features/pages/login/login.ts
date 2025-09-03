import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";

@Component({
    selector:'app-login',
    imports:[RouterLink, ReactiveFormsModule],
    templateUrl:'./login.html',
    styleUrl:'./login.css'
})
export class Login{

    title = 'Iniciar sesion';

    fb = inject(FormBuilder);

    LoginForm = this.fb.group({
        username:['usuario', [Validators.required]],
        password:['1234', [Validators.required, Validators.minLength(4)]]
    
    })


    onLogin() {
        if (!this.LoginForm.valid) {
            alert('Formulario no es válido');
            return;
        }

        const user = this.LoginForm.value;
        console.log(user);

        const storedUserJson = localStorage.getItem(user.username!);

        if (!storedUserJson) {
            alert('Usuario no existe');
            return;
        }

        const storedUser = JSON.parse(storedUserJson);
            
        if (storedUser.password === user.password) {
            alert('Inicio de sesión exitoso');
        } else {
            alert('Contraseña incorrecta');
        }
    }
        
    
}