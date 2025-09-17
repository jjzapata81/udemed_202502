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


  async onUploadFile(event: Event) {
    console.log(event);
    const inputTarget = event.target as HTMLInputElement;

    if (!inputTarget.files || inputTarget.files.length <= 0) {
      return;
    }

    const imageFile = inputTarget.files[0];
    const { username } = this.authService.getUserLogged();
    if (!username) {
      console.error("No hay usuario en sesión");
      return;
    }

    this.storageService.uploadFile(imageFile, username).then(fullPath => {
      const imageUrl = this.storageService.getUrl(fullPath);
      this.userService.saveImage(username, imageUrl);
    }).catch(error => {
      console.log(error);
      Swal.fire({
        text: 'Error al cargar la imagen',
        icon: 'error'
      })
    })

    this.router.navigate(['home']);
  }
}
