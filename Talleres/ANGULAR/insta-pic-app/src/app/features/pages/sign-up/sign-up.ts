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
          this.router.navigate([response.redirectTo]);
          Swal.fire('Usuario creado con exito');
        } else {
          Swal.fire(response.message || 'Error al crear el usuario');
        }
      }
  });
  }

}