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

  title = 'Inicio de sesión';

  validators = [Validators.required, Validators.minLength(4)];

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', this.validators]
  });

  onLogin() {
    if (!this.loginForm.valid) {
      alert('Faltan campos por diligenciar');
      return;
    }

    let credentials = this.loginForm.value;
    console.log(credentials);

    // Verificar si el usuario existe en localStorage
    const userData = localStorage.getItem(credentials.username!);
    
    if (!userData) {
      alert('Usuario no encontrado');
      return;
    }

    // Parsear los datos del usuario
    const user = JSON.parse(userData);

    // Verificar la contraseña
    if (user.password === credentials.password) {
      alert('Inicio de sesión exitoso');
      // Aquí podrías redirigir al usuario o establecer un estado de sesión
    } else {
      alert('Contraseña incorrecta');
    }
  }
}
