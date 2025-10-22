import { Component, inject } from '@angular/core';
import { Storage } from '../../../shared/services/storage';
import { Auth } from '../../../shared/services/auth';
import Swal from 'sweetalert2';
import { UserService } from '../../../shared/services/user-service';
import { Router } from '@angular/router';

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

  onUploadFile(event:Event){
    const inputTarget = event.target as HTMLInputElement;
    if(!inputTarget.files || inputTarget.files.length <=0){
      return;
    }
    const imageFile = inputTarget.files[0];
    const user = this.authService.getUserLogged();

    Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espera',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.storageService.uploadPicture(imageFile, user.username)
      .then(fullPath => {
        const imageUrl = this.storageService.getUrl(fullPath);

        // Guardar la imagen usando el servicio que consume el API
        this.userService.saveImage(user.id!, imageUrl).subscribe({
          next: (response) => {
            Swal.close();
            if (response.success) {
              Swal.fire({
                title: '¡Éxito!',
                text: response.message || 'Imagen subida correctamente',
                icon: 'success'
              }).then(() => {
                this.router.navigate(['home']);
              });
            } else {
              Swal.fire({
                title: 'Error',
                text: response.message || 'No se pudo guardar la imagen',
                icon: 'error'
              });
            }
          },
          error: (error) => {
            Swal.close();
            Swal.fire({
              title: 'Error',
              text: 'Error de conexión con el servidor',
              icon: 'error'
            });
          }
        });
      })
      .catch(error => {
        Swal.close();
        console.log(error);
        Swal.fire({
          text: 'Error al cargar la imagen',
          icon: 'error'
        });
      });
  }

}
