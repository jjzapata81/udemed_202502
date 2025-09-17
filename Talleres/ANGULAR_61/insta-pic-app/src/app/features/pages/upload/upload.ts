import { Component, inject } from '@angular/core';
import { Storage } from '../../../shared/services/storage';
import { Auth } from '../../../shared/services/auth';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/services/user-service';

@Component({
  selector: 'app-upload',
  imports: [],
  templateUrl: './upload.html',
  styleUrl: './upload.css'
})
export class Upload {

  storageService = inject(Storage);
  authService = inject(Auth);
  userService = inject(UserService);
  router = inject(Router);

  async onUploadFile(event:Event){
    console.log(event);
    const inputTarget = event.target as HTMLInputElement;

    if(!inputTarget.files || inputTarget.files.length <=0){
      return;
    }
    const imageFile = inputTarget.files[0];
    const username = this.authService.getUserLogged().username;
    //console.log("1 - llamda desde upload")
    //this.storageService.uploadFile(imageFile,username);
    //console.log("4 - respuesta desde el servicio de storage")

    /*
    Swal.fire({ßß
      title: 'Uploading...',
      text: 'Your image is being uploaded',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    */
    console.log("1- llamda desde upload")
    this.storageService.uploadFile(imageFile,username)
      .then(fullPath => {
        if (!fullPath) {
          throw new Error('No se pudo obtener la ruta del archivo subido');
        }
        const imageUrl = this.storageService.getUrl(fullPath);
        this.userService.saveImage(username, imageUrl);
        console.log('Imagen disponible en:', imageUrl);
      })
      .catch(error => {
        console.error("Error uploading file:", error);
        Swal.fire({
          text: 'Error al cargar la imagen',
          icon: 'error'
        });
      });
      this.router.navigate(['home']);

}

}
