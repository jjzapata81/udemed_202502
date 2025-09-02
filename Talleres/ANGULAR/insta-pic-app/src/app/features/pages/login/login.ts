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

  ruta = '/home';

  title = 'Registro de usuario';

  validators = [Validators.required, Validators.minLength(4)];

  loginForm = this.fb.group({
    username:['jjzapata', [Validators.required]],
    password:['', this.validators]
  })


  onLogin() {
    if (!this.loginForm.valid) {
      alert('Faltan campos por diligenciar');
      return;
    }

    let user = this.loginForm.value;
    console.log(user);

    let userString =localStorage.getItem(user.username!)


    if(userString && user.password === JSON.parse(userString)['password']){
      alert('Bienvenido de nuevo');
      return;
    } else {
      alert('Usuario no encontrado o contraseña incorrecta');
    }
  }
}