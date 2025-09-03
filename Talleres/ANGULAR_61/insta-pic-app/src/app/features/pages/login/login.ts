import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
    selector:'app-login',
    imports:[RouterLink, ReactiveFormsModule],
    templateUrl:'./login.html',
    styleUrl:'./login.css'
})
export class Login{

    fb = new FormBuilder();

    loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    onLogin() {
        if (!this.loginForm.valid) {
            alert('Formulario no es válido');
            return;
        }
        const { username, password } = this.loginForm.value;
        const userStr = localStorage.getItem(username!);
        if (!userStr) {
            alert('No se inició sesión');
            return;
        }
        const user = JSON.parse(userStr);
        if (user.password === password) {
            alert('Sesión iniciada correctamente');
        } else {
            alert('No se inició sesión');
        }
    }
}