import { Component, inject } from '@angular/core';
import { Storage } from '../../../shared/services/storage';
import { Auth } from '../../../shared/services/auth';
import Swal from 'sweetalert2'
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


  onUploadImage(event: Event) {

    let inputFile = event.target as HTMLInputElement;
    if (!inputFile.files || inputFile.files.length <= 0) {
      return;
    }

    const imageFile = inputFile.files[0];
    const userLogged = this.authService.getUserLogged();
    const username = userLogged.username;
    const userId = userLogged.userId;

    if (!userId) {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo obtener el ID del usuario',
        icon: 'error'
      });
      return;
    }

    // Show loading
    Swal.fire({
      title: 'Subiendo imagen...',
      text: 'Por favor espera',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.storageService.uploadFile(imageFile, username)
      .then(response => {
        if (response && response.data) {
          const url = this.storageService.getImageUrl(response.data.fullPath);
          
          // Call the API to save the image
          this.userService.saveImage(userId, url).subscribe({
            next: (apiResponse) => {
              Swal.fire({
                title: '¡Éxito!',
                text: 'Imagen subida correctamente',
                icon: 'success'
              }).then(() => {
                this.router.navigate(['home']);
              });
            },
            error: (error) => {
              console.error('Error saving image to API:', error);
              Swal.fire({
                title: 'Error',
                text: error.message || 'Error al guardar la imagen en el servidor',
                icon: 'error'
              });
            }
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Error al subir la imagen al almacenamiento',
            icon: 'error'
          });
        }
      })
      .catch(error => {
        console.error('Error uploading file:', error);
        Swal.fire({
          title: 'Error',
          text: 'Error al subir la imagen',
          icon: 'error'
        });
      });
  }

}
