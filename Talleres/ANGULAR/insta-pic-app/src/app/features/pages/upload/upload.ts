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
    /*Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espera',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });*/
    this.storageService.uploadPicture(imageFile,user.username)
      .then(fullPath=>{
        const imageUrl = this.storageService.getUrl(fullPath);
        this.userService.saveImage(user.id!, imageUrl).subscribe(response=>{
          if(!response.success){
            Swal.fire({
              title: 'Oops!',
              text: response.message,
              icon: 'error'
            });
            return;
          }
          Swal.fire({
            title: 'Done',
            text: 'Imagen subida!',
            icon: 'success',
            timer: 1200,
            showConfirmButton: false
          }).then(()=>{
            this.router.navigate(['home']);
          });
        });
      })
      .catch(error=>{
        console.log(error);
        Swal.fire({
          text:'Error al subir la imagen',
          icon:'error'
        })
      });
    //Swal.close();
  }

}