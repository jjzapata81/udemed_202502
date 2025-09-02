import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  fb = inject(FormBuilder);

  ruta = '';

  title = 'Inicio de sesión';

  validators = [Validators.required, Validators.minLength(4)];

  signInForm = this.fb.group({
    username_login:['', [Validators.required]],
    password:['', this.validators]
  })


  onSignIn(){
    if(!this.signInForm.valid){
      alert('Faltan campos por diligenciar');
      return;
    }
    let user = this.signInForm.value;
    console.log(user);

    if(localStorage.getItem(user.username_login!) 
        && JSON.parse(localStorage.getItem(user.username_login!)!).password === user.password){
      alert('Login exitoso');
      return;
    } else {
      alert('Usuario no existe');
      return;
    }

}
}