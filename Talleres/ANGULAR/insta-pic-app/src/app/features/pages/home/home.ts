import { Component, inject, OnInit, signal } from '@angular/core';
import { Auth } from '../../../shared/services/auth';
import { UserService } from '../../../shared/services/user-service';
import { GalleryImage } from '../../../shared/interfaces/user-response';

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
  galleryItems = signal<GalleryImage[]>([]);

  ngOnInit(): void {
    this.userService.getGallery(this.user.id).subscribe({
      next: (gallery) => {
        this.galleryItems.set(gallery);
      },
      error: (error) => {
        console.error('Error al cargar galería:', error);
        this.galleryItems.set([]);
      }
    });
  }

}
