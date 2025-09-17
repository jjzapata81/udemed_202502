import { Component, inject, OnInit, signal } from '@angular/core';
import { Auth } from '../../../shared/services/auth';
import { UserService } from '../../../shared/services/user-service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  authService = inject(Auth);
  userService = inject(UserService); // --- IGNORE ---
  followers = 48;
  requests = 37;
  username = this.authService.getUserLogged();

  galleryItems = signal(<any[]|[{id:string, url:string, comments:[]}]>[]); // --- IGNORE ---

    ngOnInit(): void {
    const gallery = this.userService.getGallery(this.username.username);
    this.galleryItems.set(gallery);
  }




}
