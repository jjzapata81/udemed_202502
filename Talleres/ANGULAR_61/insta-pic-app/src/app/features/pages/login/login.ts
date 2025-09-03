import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterLink, ReactiveFormsModule],
    templateUrl: './login.html',
    styleUrl: './login.css'
})
export class Login {

    fb = inject(FormBuilder);
    router = inject(Router); // para redirigir si se desea

    loginForm = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
    });

    onLogin() {
        
        if (this.loginForm.valid) {
            alert('Formulario no válido');
            return;
        }

        const { username, password } = this.loginForm.value;

        // Buscar al usuario en localStorage
        // ....
        const userStr = localStorage.getItem(username!);
        console.log(userStr);
        if (!userStr) {
            alert('Usuario no encontrado');
            return;
        }

        const user = JSON.parse(userStr);

        if (user.password !== password) {
            alert('Contraseña incorrecta');
            return;
        }

        alert(`Bienvenido, ${username}!`);

    }
}
