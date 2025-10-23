import { Component, inject } from '@angular/core';
import { Storage } from '../../../shared/services/storage';
import { Auth } from '../../../shared/services/auth';
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

  message = '';
  isLoading = false;

  onUploadFile(event: Event) {
    const inputTarget = event.target as HTMLInputElement;
    if (!inputTarget.files || inputTarget.files.length <= 0) {
      return;
    }

    const imageFile = inputTarget.files[0];
    const user = this.authService.getUserLogged();

    this.isLoading = true;
    this.message = 'Subiendo imagen...';

    // Subimos la imagen llamando al servicio de storage
    this.storageService
      .uploadPicture(imageFile, user.username)
      .then((fullPath) => {
        // Obtenemos la URL de la imagen que el usuario va a subir
        const imageUrl = this.storageService.getUrl(fullPath);

        // Guardar la URL en el servicio de usuario
        this.userService.saveImage(user.id!, imageUrl).subscribe({
          next: (response) => {
            this.isLoading = false;

            if (response.success) {
              this.message = '¡Imagen subida correctamente!';
            } else {
              this.message = response.message || 'Error al guardar la imagen';
            }
          },
          error: (err) => {
            this.isLoading = false;
            this.message = 'Error al guardar la imagen';
            console.error('Error al guardar imagen:', err);
          },
        });
      })
      .catch((error) => {
        this.isLoading = false;
        this.message = 'Error al subir la imagen';
        console.error('Error al subir imagen:', error);
      });
  }
}
