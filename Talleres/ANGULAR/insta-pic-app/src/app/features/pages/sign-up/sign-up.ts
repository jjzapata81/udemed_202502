import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../shared/services/auth';
import { User } from '../../../shared/interfaces/user';
import swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp {

  fb = inject(FormBuilder);

  router = inject(Router);

  authService = inject(Auth);

  ruta = '';

  title = 'Registro de usuario';

  validators = [Validators.required, Validators.minLength(4)];

  signUpForm = this.fb.group({
    username:['', [Validators.required]],
    email:['', [Validators.required]],
    password:['', this.validators],
    rePassword:['',  this.validators],
  })


  onSignUp(){
    if(!this.signUpForm.valid){
      alert('Faltan campos por diligenciar');
      return;
    }
    let user = this.signUpForm.value as User;

    let signUpResponse = this.authService.signUp(user);

    signUpResponse.subscribe({
      next: (response) => {
        if (response.success) {
          swal.fire({
            title: 'Éxito',
            text: 'Usuario creado con éxito',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.router.navigate([response.redirectTo]);
        }
        else {{
          swal.fire({
            title: 'Error',
            text: 'Usuario ya existe, intente con otro',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }}
      },
      error: (err) => {
        alert(err.message);
      },
    });
  }

}
