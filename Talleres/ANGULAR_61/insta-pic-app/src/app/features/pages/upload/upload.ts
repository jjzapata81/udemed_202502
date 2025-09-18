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
    const username = this.authService.getUserLogged().username;
    
    this.storageService.uploadFile(imageFile,username)
      .then(fullPath=>{
        const imageUrl = this.storageService.getUrl(fullPath);
        this.userService.saveImage(username, imageUrl);

        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: '¡Imagen cargada exitosamente!',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
        
        this.router.navigate(['home']);
      })
      .catch(error=>{
        console.log(error);
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'error',
          title: 'Error al cargar la imagen',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
      });
  }

}
