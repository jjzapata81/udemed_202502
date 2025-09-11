import { Component, inject } from '@angular/core';
import { Storage } from '../../../shared/services/storage';
import { Auth } from '../../../shared/services/auth';

@Component({
  selector: 'app-upload',
  imports: [],
  templateUrl: './upload.html',
  styleUrl: './upload.css'
})
export class Upload {
  storageService = inject(Storage);
  authService = inject(Auth);

  onUploadImage(event: Event) {

    let inputFile = event.target as HTMLInputElement; // Convierte el event.target a un HTMLInputElement castear, para poder acceder a la propiedad files
    if (!inputFile.files || inputFile.files.length <= 0) { // Si no hay archivos o si la longitud es menor o igual a 0 entonces return
      return;
    }

    const imageFile = inputFile.files[0]; // Accede al primer archivo de la lista de archivos seleccionados

    const username = this.authService.getUserLogged().username; // Obtiene el nombre de usuario del usuario que ha iniciado sesión

    this.storageService.uploadFile(imageFile, username);

    console.log(event);

  }

}
