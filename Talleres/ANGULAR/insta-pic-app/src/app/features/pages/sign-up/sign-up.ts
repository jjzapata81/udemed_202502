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
    username:['jjzapata', [Validators.required]],
    email:['', [Validators.required]],
    password:['', this.validators],
    rePassword:['',  this.validators],
  })


  onSignUp(){
    if(!this.signUpForm.valid){ // Verifica si el formulario es válido
      alert('Faltan campos por diligenciar');
      return;
    }
    let user = this.signUpForm.value as User; // Convierte el valor del formulario en un objeto User

    this.authService.signUp(user).subscribe({ // Suscribe al observable devuelto por el servicio de autenticación
      next: (response) => { // Maneja la respuesta exitosa
        if (response.success) { // Si la respuesta es exitosa
          this.router.navigate([response.redirectTo || 'home']); // Navega a la ruta indicada o a 'home' por defecto
        } else {
          alert(response.message || 'No se pudo crear el usuario'); // Muestra un mensaje de error si la creación del usuario falla
        }
      },
      error: (err) => { // Maneja errores en la petición
        console.error('Error en signUp:', err); // Loguea el error para depuración
        alert(err?.message || 'Error inesperado al crear el usuario'); // Muestra un mensaje de error genérico
      }
    });
  }

}
