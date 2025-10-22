import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../shared/services/auth';
import { User, CreateUserDto } from '../../../shared/interfaces/user';

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
    username:['jjzapata', [Validators.required]],
    name:['', [Validators.required]],
    email:['', [Validators.required]],
    password:['', this.validators],
    rePassword:['',  this.validators],
  })


  onSignUp(){
    if(!this.signUpForm.valid){
      alert('Faltan campos por diligenciar');
      return;
    }

    if(this.signUpForm.value.password !== this.signUpForm.value.rePassword){
      alert('Las contraseñas no coinciden');
      return;
    }

    let user: CreateUserDto = {
      username: this.signUpForm.value.username!,
      name: this.signUpForm.value.name!,
      email: this.signUpForm.value.email!,
      password: this.signUpForm.value.password!
    };

    this.authService.signUp(user).subscribe({
      next: (response) => {
        if(response.success){
          this.router.navigate([response.redirectTo]);
        } else {
          alert(response.message);
        }
      },
      error: (error) => {
        console.error('Error en el registro:', error);
        alert('Error al crear el usuario');
      }
    });
  }

}
