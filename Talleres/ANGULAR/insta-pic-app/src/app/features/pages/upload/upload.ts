import { Component, inject } from '@angular/core';
import { Auth } from '../../../shared/services/auth';
import { Storage } from '../../../shared/services/storage';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/services/user-service';

@Component({
  selector: 'app-upload',
  imports: [],
  templateUrl: './upload.html',
  styleUrl: './upload.css'
})
export class Upload {

  storgeService = inject(Storage);
  authService = inject(Auth);
  userService = inject(UserService);
  router = inject(Router);

  onUploadImage(event:Event) {
    let inputFile = event!.target as HTMLInputElement;

    if(!inputFile.files || inputFile.files.length <= 0) {
      return;
    }
    
    const imageFile = inputFile.files[0];
    const username = this.authService.getUserLogged().username;

    Swal.showLoading();
    this.storgeService.uploadFile(imageFile, username)
    .then(response=>{
      if(response && response.data) {
        const url = this.storgeService.getImageUrl(response.data.fullPath);
        this.userService.saveImage(username, url);
        
      } else if(response){
        Swal.fire('Error');
      }
    });

    this.router.navigate(['/home']);
  }




}
