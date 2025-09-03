import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";

@Component({
    selector:'app-sign-up',
    imports:[RouterLink, ReactiveFormsModule],
    templateUrl:'./sign-up.html',
    styleUrl:'./sign-up.css'
})
export class SignUp{

    title = 'Registro de usuario';

    fb = inject(FormBuilder);

    signUpForm = this.fb.group({
        username:['usuario', [Validators.required]],
        email:['edada@gmail.com', [Validators.required]],
        password:['1234', [Validators.required, Validators.minLength(4)]],
        rePassword:['1234', [Validators.required, Validators.minLength(4)]]
    })


    onSignUp(){
        if(!this.signUpForm.valid){
            alert('Formulario no es valido');
            return;
        }
        let user = this.signUpForm.value
        console.log(user)
        
        let existingUser = localStorage.getItem(user.username!);
        if (existingUser) {
            alert('El usuario ya existe');
            return; 
        }

        let userStr = JSON.stringify(user)

        localStorage.setItem(user.username!, userStr);    


    }

}