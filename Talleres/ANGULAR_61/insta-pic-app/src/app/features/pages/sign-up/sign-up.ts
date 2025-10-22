import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { Auth } from "../../../shared/services/auth";
import { SignUpRequest } from "../../../shared/interfaces/sign-up-request";
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
        const { username, email, password, rePassword } = this.signUpForm.value;

        if (password !== rePassword) {
            Swal.fire({
                title: "Ops!",
                text: "Las contraseñas no coinciden",
                icon: "error"
            });
            return;
        }

        const payload: SignUpRequest = {
            username: username!,
            email: email!,
            password: password!,
            name: username!
        };

        this.authService.onSignUp(payload)
            .subscribe(response => {
                if (!response.success) {
                    Swal.fire({
                        title: "Ops!",
                        text: response.message,
                        icon: "error"
                    });
                    return;
                }
                const redirect = response.redirectTo ?? 'home';
                this.router.navigate([redirect]);
            });
    }

}
