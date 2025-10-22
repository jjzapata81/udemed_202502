import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { Auth } from "../../../shared/services/auth";
import { User } from "../../../shared/interfaces/user";
import Swal from 'sweetalert2'

@Component({
    selector: 'app-sign-up',
    imports: [RouterLink, ReactiveFormsModule],
    templateUrl: './sign-up.html',
    styleUrl: './sign-up.css'
})
export class SignUp {

    title = 'Registro de usuario';

    fb = inject(FormBuilder);

    router = inject(Router);

    authService = inject(Auth);

    signUpForm = this.fb.group({
        username: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        rePassword: ['', [Validators.required, Validators.minLength(4)]]
    })


    onSignUp() {
        if (!this.signUpForm.valid) {
            Swal.fire({
                title: "Ops!",
                text: "El formulario no es valido",
                icon: "error"
            });
            return;
        }
        const form = this.signUpForm.value;

        // validación adicional: contraseñas iguales
        if (form.password !== (this.signUpForm.get('rePassword')?.value)) {
            Swal.fire({
                title: "Ops!",
                text: "Las contraseñas no coinciden",
                icon: "error"
            });
            return;
        }

        // construir payload explícito (CreateUserDto)
        const payload = {
            username: form.username,
            password: form.password,
            email: form.email,
            name: (form as any).name,
            url: (form as any).url
        };

        // log para depuración: qué payload se envía
        console.log('signUp payload:', payload);

        this.authService.onSignUp(payload).subscribe((response) => {
            if (!response.success) {
                Swal.fire({
                    title: "Ops!",
                    text: response.message,
                    icon: "error"
                });
                return;
            }
            this.router.navigate([response.redirectTo]);
        });
    }

}