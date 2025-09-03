import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp {

  fb = inject(FormBuilder);
  router = inject(Router);

  ruta = '';

  title = 'Registro de usuario';

  validators = [Validators.required, Validators.minLength(4)];

  signUpForm = this.fb.group({
    username:['', [Validators.required]],
    email:['', [Validators.required, Validators.email]],
    password:['', this.validators],
    rePassword:['',  this.validators],
  });



  onSignUp(){
    if(!this.signUpForm.valid){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Faltan campos por diligenciar',
      });
      return;
    }

    let user = this.signUpForm.value;

    if(localStorage.getItem(user.username!)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'El usuario ya existe',
      });
      return;
    }

    localStorage.setItem(user.username!, JSON.stringify(user));
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Usuario registrado exitosamente',
    });

    this.router.navigate(['/login']);
  }

}
