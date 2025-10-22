import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { Auth } from "../../../shared/services/auth";
import { SignUpRequest } from "../../../shared/interfaces/login-response";
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

        const user: SignUpRequest = {
            username: this.signUpForm.value.username!,
            email: this.signUpForm.value.email!,
            password: this.signUpForm.value.password!
        };

        this.authService.onSignUp(user).subscribe({
            next: (response) => {
                if (response.success) {
                    Swal.fire({
                        title: "¡Éxito!",
                        text: "Usuario registrado correctamente",
                        icon: "success"
                    }).then(() => {
                        this.router.navigate([response.redirectTo || 'home']);
                    });
                } else {
                    Swal.fire({
                        title: "Ops!",
                        text: response.message || "Error al registrar el usuario",
                        icon: "error"
                    });
                }
            },
            error: (error) => {
                Swal.fire({
                    title: "Error!",
                    text: "Error de conexión con el servidor",
                    icon: "error"
                });
            }
        });
    }

}
