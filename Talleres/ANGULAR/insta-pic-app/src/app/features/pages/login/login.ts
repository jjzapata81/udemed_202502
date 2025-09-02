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

  LoginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })

  onLogin() {
    if (!this.LoginForm.valid) {
      alert('Faltan campos por diligenciar');
      return;
    }
    let user = this.LoginForm.value;
    console.log(user);
    let userStr = localStorage.getItem(user.username!)

    if (userStr) {
      let userRegistered = JSON.parse(userStr)
      if (userRegistered.password === user.password) {
        alert('Usuario loggeado exitosamnete');
        return;
      }
    }
    alert('Login incorrecta');
  }

}
