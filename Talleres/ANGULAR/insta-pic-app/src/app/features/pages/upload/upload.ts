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
  userService = inject(UserService);
  router = inject(Router);

  onUploadFile(event: Event) {
    const inputTarget = event.target as HTMLInputElement;
    if (!inputTarget.files || inputTarget.files.length <= 0) {
      return;
    }
    const imageFile = inputTarget.files[0];
    const user = this.authService.getUserLogged();
    /*Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espera',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });*/
    this.storageService.uploadPicture(imageFile, user.username).then((fullPath) => {
      const imageUrl = this.storageService.getUrl(fullPath);
      console.log('🚀 ~ Upload ~ onUploadFile ~ id:', user.id);
      console.log('🚀 ~ Upload ~ onUploadFile ~ imageUrl:', imageUrl);
      this.userService.saveImage(user.id!, imageUrl).subscribe({
        next: () => {
          Swal.fire({
            text: 'Imagen cargada exitosamente',
            icon: 'success',
          });
          this.router.navigate(['home']);
        },
        error: (error) => {
          console.error(error);
          Swal.fire({
            text: 'Ocurrió un error al subir la imagen',
            icon: 'error',
          });
        },
      });
    });

    //Swal.close();
  }
}
