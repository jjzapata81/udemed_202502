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

  onUploadImage(event: Event) {
    const { username } = this.authService.getUserLogged();
    const target = event.target as HTMLInputElement;
    if (!target.files || target.files.length <= 0) {
      return;
    }
    const imageFile = target.files[0];
    console.log('1 - Llamar al servicio');
    this.storageService.uploadFile(imageFile, username).then((response) => {
      if (response && response.data) {
        const url = this.storageService.getImageUrl(response.data.fullPath);
        this.userService.saveImage(username, url);
      } else if (response && response.error) {
        Swal.fire('Error!');
      }
      this.router.navigate(['home']);
    });
  }
}
