import { Component, inject, OnInit, signal } from '@angular/core';
import { Auth } from '../../../shared/services/auth';
import { UserService } from '../../../shared/services/user-service';
import { GalleryResponse } from '../../../shared/interfaces/gallery';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  authService = inject(Auth);
  userService = inject(UserService);
  followers = 48;
  requests = 37;
  user = this.authService.getUserLogged();
  galleryItems = signal<GalleryResponse[]>([]);

  ngOnInit(): void {
    this.userService
      .getGallery(this.user.id)
      .subscribe((response) => this.galleryItems.set(response));
    // this.galleryItems.set(gallery);
  }
}
