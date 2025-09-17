import { Component, inject } from '@angular/core';
import {Storage} from '../../../shared/services/storage';
import {Auth} from '../../../shared/services/auth';
import { UserService } from '../../../shared/services/user-service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-upload',
  imports: [],
  templateUrl: './upload.html',
  styleUrl: './upload.css'
})
export class Upload {
  storageService = inject(Storage);
  authService = inject(Auth);


  onUploadFile(event: Event){
    const inputElement= event.target as HTMLInputElement;
    if (!inputElement.files || inputElement.files.length <= 0){ 
      return;
    }
    const imageFile= inputElement.files[0];
    const username= this.authService.getUserLogged().username;
    this.storageService.uploadFile(imageFile, username)
    .then(fullPath=>{
      const imageUrl = this.storageService.getUrl(fullPath);
      this.UserService.saveImage()
    })
    .catch(error=>{
      console.log(error);
      Swal.fire({
        text: 'Error al cargar la imágen',
        icon:'Error'
      })
    });

    this.router.navigate(['home'])
  }
}
