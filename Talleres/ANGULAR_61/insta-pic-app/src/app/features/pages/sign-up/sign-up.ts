import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { Auth } from "../../../shared/services/auth";
import { User } from "../../../shared/interfaces/user";
import Swal from 'sweetalert2'

@Component({
    selector: 'app-sign-up',
    imports: [RouterLink, ReactiveFormsModule, CommonModule],
    templateUrl: './sign-up.html',
    styleUrl: './sign-up.css'
})
export class SignUp {

    title = 'Registro de usuario';

    fb = inject(FormBuilder);
    router = inject(Router);
    authService = inject(Auth);

    // Validador personalizado para verificar que las contraseñas coincidan
    passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password');
        const rePassword = control.get('rePassword');

        if (!password || !rePassword) {
            return null;
        }

        if (password.value !== rePassword.value) {
            return { passwordMismatch: true };
        }

        return null;
    }

    signUpForm = this.fb.group({
        username: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        rePassword: ['', [Validators.required, Validators.minLength(4)]]
    }, { validators: this.passwordMatchValidator })

    // Getter para verificar si las contraseñas no coinciden
    get passwordMismatch() {
        return this.signUpForm.errors?.['passwordMismatch'] && 
               this.signUpForm.get('rePassword')?.touched;
    }

    onSignUp() {
        if (!this.signUpForm.valid) {
            // Verificar errores específicos para mostrar mensajes más claros
            if (this.signUpForm.errors?.['passwordMismatch']) {
                Swal.fire({
                    title: "Ops!",
                    text: "Las contraseñas no coinciden",
                    icon: "error"
                });
                return;
            }
            
            // Verificar otros errores de campos individuales
            const controls = this.signUpForm.controls;
            if (controls['username'].errors?.['required']) {
                Swal.fire({
                    title: "Ops!",
                    text: "El nombre de usuario es requerido",
                    icon: "error"
                });
                return;
            }
            if (controls['email'].errors?.['required']) {
                Swal.fire({
                    title: "Ops!",
                    text: "El email es requerido",
                    icon: "error"
                });
                return;
            }
            if (controls['email'].errors?.['email']) {
                Swal.fire({
                    title: "Ops!",
                    text: "El email no tiene un formato válido",
                    icon: "error"
                });
                return;
            }
            if (controls['password'].errors?.['required']) {
                Swal.fire({
                    title: "Ops!",
                    text: "La contraseña es requerida",
                    icon: "error"
                });
                return;
            }
            if (controls['password'].errors?.['minlength']) {
                Swal.fire({
                    title: "Ops!",
                    text: "La contraseña debe tener al menos 4 caracteres",
                    icon: "error"
                });
                return;
            }
            if (controls['rePassword'].errors?.['required']) {
                Swal.fire({
                    title: "Ops!",
                    text: "Debe confirmar la contraseña",
                    icon: "error"
                });
                return;
            }
            
            Swal.fire({
                title: "Ops!",
                text: "El formulario no es válido",
                icon: "error"
            });
            return;
        }
        
        let user = this.signUpForm.value as User;

        let response = this.authService.onSignUp(user);

        if (!response.success) {
            Swal.fire({
                title: "Ops!",
                text: response.message,
                icon: "error"
            });
            return;
        }
        this.router.navigate([response.redirectTo]);
    }

}