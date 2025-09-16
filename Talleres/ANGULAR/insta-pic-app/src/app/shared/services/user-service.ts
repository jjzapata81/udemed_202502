import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

// Aquí creamos la bd de usuario
export class UserService {
  saveImage(username: string, url: string) {
    let userString = localStorage.getItem(username);

    // Aquí se haría la lógica para guardar la URL por usuario en la base de datos
    if (userString) {
      let user = JSON.parse(userString);
      user.gallery.push(url); // Agrega la nueva URL al array gallery de user
      console.log('user', user);
      localStorage.setItem(username, JSON.stringify(user));
    }
  }

  getUser(username: string) {
    let userString = localStorage.getItem(username);

    if (userString) {
      return JSON.parse(userString);
    } else {
      return;
    }
  }
}
