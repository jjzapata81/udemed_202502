import { Component, inject} from '@angular/core';
import { Storage } from '../../../shared/services/storage';
import { Auth } from '../../../shared/services/auth';
import { UserService } from '../../../shared/services/user-service';
import Swal from 'sweetalert2';
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
  router = inject(Router);
  userService = inject(UserService);

  onUploadImage(event: Event){
    let inputFile = event.target as HTMLInputElement;
    if(!inputFile.files || inputFile.files.length <= 0){
      return;
    }

    const imageFile = inputFile.files[0];
    const username = this.authService.getUserLogged().username;
    //Swal.showLoading();
    this.storageService.uploadFile(imageFile, username)
    .then(response=>{
      if(response && response.data){
        const url = this.storageService.getimageUrl(response.data.fullPath);
        this.userService.saveImage(username,url);
        console.log(url);
        
      }
      else if(response){
      console.log(response.error);
      Swal.fire('Error', response.error?.message, 'error');
      }
    }); 
    this.router.navigate(['/home']);
    console.log(event);

  }

}
