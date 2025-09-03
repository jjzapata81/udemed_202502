import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  fb = inject(FormBuilder);
  router = inject(Router);

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  
  
  onLogin() {
  if (!this.loginForm.valid) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Complete los campos',
    });
    return;
  }

  const user = this.loginForm.value;

  // 1. Buscar usuario en localStorage
  const strUser = localStorage.getItem(user.username!);

  if (!strUser) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Usuario no encontrado',
    });
    return;
  }

  // 2. Parsear el usuario guardado
  const parsedUser = JSON.parse(strUser);

  // 3. Validar contraseña
  if (parsedUser.password !== user.password) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Contraseña incorrecta',
    });
    return;
  }

  localStorage.setItem('user', JSON.stringify(user.username));
  this.router.navigate(['/home']);
}
}
