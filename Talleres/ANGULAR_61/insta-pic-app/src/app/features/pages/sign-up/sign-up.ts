import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink, Router } from "@angular/router";

@Component({
    selector:'app-sign-up',
    imports:[RouterLink, ReactiveFormsModule],
    templateUrl:'./sign-up.html',
    styleUrl:'./sign-up.css'
})
export class SignUp{

    title = 'Registro de usuario';

    fb = inject(FormBuilder);
    router = inject(Router);

    signUpForm = this.fb.group({
        username:['', [Validators.required]],
        email:['', [Validators.required, Validators.email]],
        password:['', [Validators.required, Validators.minLength(4)]],
        rePassword:['', [Validators.required, Validators.minLength(4)]]
    })

    onSignUp(){
        if(!this.signUpForm.valid){
            alert('Formulario no es valido');
            return;
        }
        let user = this.signUpForm.value;
    
        if (localStorage.getItem(user.username!)) {
            alert('El nombre de usuario ya está registrado');
            return;
        }
        if (user.password !== user.rePassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        let userStr = JSON.stringify(user);
        localStorage.setItem(user.username!, userStr);
        
        localStorage.setItem('currentUser', JSON.stringify({ username: user.username, isLoggedIn: true }));
        alert('Usuario registrado exitosamente');
        this.router.navigate(['/home']);
    }


}