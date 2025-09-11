import { Component, inject } from '@angular/core';
import { Storage } from '../../../shared/services/storage';
import { Auth } from '../../../shared/services/auth';

@Component({
  selector: 'app-upload',
  imports: [],
  templateUrl: './upload.html',
  styleUrl: './upload.css',
})
export class Upload {
  storageService = inject(Storage);
  authService = inject(Auth);

  onUploadImage(event: Event) {
    const { username } = this.authService.getUserLogged();
    const target = event.target as HTMLInputElement;
    if (!target.files || target.files.length <= 0) {
      return;
    }
    const imageFile = target.files[0];
    this.storageService.uploadFile(imageFile, username);
  }
}
