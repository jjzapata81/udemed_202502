import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../shared/services/auth';
import { User } from '../../../shared/interfaces/user';

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
    username: ['jjzapata', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', this.validators],
    rePassword: ['', this.validators],
  })


  onSignUp() {
    if (!this.signUpForm.valid) {
      alert('Faltan campos por diligenciar');
      return;
    }
    let user = this.signUpForm.value as User;

    this.authService.signUp(user).subscribe(response => {
      if (!!response.success) {
        this.router.navigate([response.redirectTo]);
        return;
      }
      alert(response.message);
    });

  }

}
