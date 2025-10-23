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

  onUploadFile(event: Event) {
    const inputTarget = event.target as HTMLInputElement;
    if (!inputTarget.files || inputTarget.files.length <= 0) {
      return;
    }
    let imageFile = inputTarget.files[0];
    let user = this.authService.getUserLogged();
    this.storageService.uploadPicture(imageFile, JSON.stringify(user));
      subscribe(response=>{
        if (response.success) {
            this.storageService.uploadPicture(imageFile, user.username)
            const imageUrl = this.storageService.getUrl(response);
            this.userService.saveImage(user.id!, imageUrl);
            this.router.navigate(['home'])
            return;
        }
        Swal.fire({
            text: 'Error al cargar la imagen',
            icon: 'error'
        });

      });
    /*Swal.fire({
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
        this.userService.saveImage(user.id!, imageUrl);
      })
      .catch(error => {
        console.log(error);
        Swal.fire({
          text: 'Error al cargar la imagen',
          icon: 'error'
        })
      });
    this.router.navigate(['home'])
    Swal.close();*/
  }
  

}
function subscribe(arg0: (response: any) => void) {
  throw new Error('Function not implemented.');
}

