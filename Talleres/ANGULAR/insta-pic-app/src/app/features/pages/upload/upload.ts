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
  styleUrl: './upload.css',
})
export class Upload {
  storageService = inject(Storage);
  authService = inject(Auth);
  router = inject(Router);
  userService = inject(UserService);

  async onUploadImage(event: Event) {
    const { username } = this.authService.getUserLogged();
    const target = event.target as HTMLInputElement;

    if (!target.files || target.files.length <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Sin archivo',
        text: 'Por favor selecciona un archivo antes de subir.',
      });
      return;
    }

    const imageFile = target.files[0];

    try {
      console.log('1 - Llamar al servicio');
      const response = await this.storageService.uploadFile(imageFile, username);

      if (response && response.data) {
        const path = response.data.path ?? response.data.fullPath ?? '';
        if (path) {
          const url = this.storageService.getImageUrl(path);
          await this.userService.saveImage(username, url);

          await Swal.fire({
            icon: 'success',
            title: '¡Imagen subida!',
            text: 'Tu imagen se ha cargado correctamente.',
            timer: 2000,
            showConfirmButton: false,
          });

          this.router.navigate(['home']);
          return;
        }
      }

      Swal.fire({
        icon: 'error',
        title: 'Error al subir',
        text: 'No se pudo subir la imagen, intenta de nuevo.',
      });

    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error inesperado',
        text: 'Ocurrió un problema durante la carga. Intenta más tarde.',
      });
    }
  }
}
