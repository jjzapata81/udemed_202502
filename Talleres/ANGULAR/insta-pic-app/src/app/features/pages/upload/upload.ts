import { Component, inject } from '@angular/core';
import { Auth } from '../../../shared/services/auth';
import { Storage } from '../../../shared/services/storage';

@Component({
  selector: 'app-upload',
  imports: [],
  templateUrl: './upload.html',
  styleUrl: './upload.css'
})
export class Upload {

  storgeService = inject(Storage);
  authService = inject(Auth);

  onUploadImage(event:Event) {
    let inputFile = event!.target as HTMLInputElement;

    if(!inputFile.files || inputFile.files.length <= 0) {
      return;
    }
    
    const imageFile = inputFile.files[0];
    const username = this.authService.getUserLogged().username;

    this.storgeService.uploadFile(imageFile, username);
    console.log(event);
  }

}
