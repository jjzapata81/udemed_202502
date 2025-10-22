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

  async onUploadFile(event:Event){
    const inputTarget = event.target as HTMLInputElement;
    if(!inputTarget.files || inputTarget.files.length <=0){
      return;
    }
    const imageFile = inputTarget.files[0];
    const user = this.authService.getUserLogged();
    if(!user.id){
      Swal.fire({
        title: 'Ops!',
        text: 'No se encontró información del usuario autenticado',
        icon: 'error'
      });
      return;
    }
    /*Swal.fire({
      title: 'Cargando...',
      text: 'Por favor espera',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });*/
    try{
      const fullPath = await this.storageService.uploadPicture(imageFile,user.username)
      const imageUrl = this.storageService.getUrl(fullPath);
      this.userService.saveImage(user.id, imageUrl)
        .subscribe({
          next: () => {
            Swal.fire({
              icon:'success',
              title:'¡Listo!',
              text:'Imagen cargada correctamente'
            }).then(()=>{
              this.router.navigate(['home']);
            });
          },
          error: (error: Error) => {
            Swal.fire({
              title: 'Ops!',
              text: error.message,
              icon: 'error'
            });
          }
        });
    }catch(error){
      console.log(error);
      Swal.fire({
        text:'Error al cargar la imagen',
        icon:'error'
      })
    }
    //Swal.close();
  }

}
