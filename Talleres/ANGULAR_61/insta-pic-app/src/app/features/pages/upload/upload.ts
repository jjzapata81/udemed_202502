import { Component, inject } from '@angular/core';
import { Storage } from '../../../shared/services/storage';
import { Auth } from '../../../shared/services/auth';

@Component({
  selector: 'app-upload',
  imports: [],
  templateUrl: './upload.html',
  styleUrl: './upload.css'
})
export class Upload {
  storageService = inject(Storage);
  authService = inject(Auth);


  onUploadFile(event:Event){
    
    const inputTarget = event.target as HTMLInputElement;
    if(!inputTarget.files || inputTarget.files.length <= 0){
      return;
    }
    const imageFile = inputTarget.files[0]
    const username = this.authService.getUserLogged().username;
    this.storageService.uploadFile(imageFile,username);
  }
}
