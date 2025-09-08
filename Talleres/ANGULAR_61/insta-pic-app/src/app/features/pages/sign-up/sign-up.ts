import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from "@angular/forms";
import { RouterLink, Router } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
    selector:'app-sign-up',
    imports:[RouterLink, ReactiveFormsModule, CommonModule],
    templateUrl:'./sign-up.html',
    styleUrl:'./sign-up.css'
})
export class SignUp{

    title = 'Registro de usuario';

    fb = inject(FormBuilder);
    router = inject(Router);

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

    get passwordMismatch() {
        return this.signUpForm.errors?.['passwordMismatch'] && this.signUpForm.get('rePassword')?.touched;
    }

    signUpForm = this.fb.group({
        username:['', [Validators.required]],
        email:['', [Validators.required, Validators.email]],
        password:['', [Validators.required, Validators.minLength(4)]],
        rePassword:['', [Validators.required, Validators.minLength(4)]]
    }, { validators: this.passwordMatchValidator })

    onSignUp(){
        if(!this.signUpForm.valid){
            if (this.signUpForm.errors?.['passwordMismatch']) {
                alert('Las contraseñas no coinciden');
                return;
            }
                        const controls = this.signUpForm.controls;
            if (controls['username'].errors?.['required']) {
                alert('El nombre de usuario es requerido');
                return;
            }
            if (controls['email'].errors?.['required']) {
                alert('El email es requerido');
                return;
            }
            if (controls['email'].errors?.['email']) {
                alert('El email no tiene un formato válido');
                return;
            }
            if (controls['password'].errors?.['required']) {
                alert('La contraseña es requerida');
                return;
            }
            if (controls['password'].errors?.['minlength']) {
                alert('La contraseña debe tener al menos 4 caracteres');
                return;
            }
            if (controls['rePassword'].errors?.['required']) {
                alert('Debe confirmar la contraseña');
                return;
            }
            
            alert('Formulario no es válido');
            return;
        }
        
        let user = this.signUpForm.value;
    
        if (localStorage.getItem(user.username!)) {
            alert('El nombre de usuario ya está registrado');
            return;
        }

        let userStr = JSON.stringify(user);
        localStorage.setItem(user.username!, userStr);
        localStorage.setItem('currentUser', JSON.stringify({ username: user.username, isLoggedIn: true }));
        alert('Usuario registrado exitosamente');
        this.router.navigate(['/home']);
    }

}