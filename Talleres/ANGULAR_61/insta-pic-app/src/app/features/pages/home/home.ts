import { Component, inject, OnInit, signal } from '@angular/core';
import { Auth } from '../../../shared/services/auth';
import { UserService } from '../../../shared/services/user-service';
import { GalleryItem } from '../../../shared/interfaces/gallery-item';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{

  authService = inject(Auth);
  userService = inject(UserService);
  followers = 48;
  requests = 37;
  user = this.authService.getUserLogged();
  galleryItems = signal<GalleryItem[]>([]);

  ngOnInit(): void {

    this.userService.getGallery(this.user.id).subscribe(this.galleryItems.set);

  }

}
