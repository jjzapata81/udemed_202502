import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterLink } from "@angular/router";

@Component({
    selector:'app-login',
    imports:[RouterLink,ReactiveFormsModule],
    templateUrl:'./login.html',
    styleUrl:'./login.css'
})

export class Login {
  title = 'Inicio de sesión';

  fb_2 = inject(FormBuilder);

  LoginForm = this.fb_2.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });

  onLogin() {
    if (this.LoginForm.valid) {
      const { username, password } = this.LoginForm.value;

      const savedUser = localStorage.getItem(username!);

      if (savedUser) {
        const userData = JSON.parse(savedUser); 

        if (userData.username === username && userData.password === password) {
          alert(' Validación exitosa');
        } else {
          alert('Validación incorrecta');
            }
        }
    }
    }
}
