import { Component, inject, OnInit, signal } from '@angular/core';
import { Auth } from '../../../shared/services/auth';
import { UserService } from '../../../shared/services/user-service';

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
  galleryItems = signal<any[] | [{ id: string; url: string; comments: string[] }]>([]);

  ngOnInit(): void {
    this.userService.getGallery(this.user.id).subscribe(
      (galleryData) => {
        this.galleryItems.set(galleryData);
      },
      (error) => {
        console.error('Error al obtener galería:', error);
        this.galleryItems.set([]);
      }
    );
  }
}
