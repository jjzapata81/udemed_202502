import { Component, inject, OnInit, signal } from '@angular/core';
import { Auth } from '../../../shared/services/auth';
import { UserService } from '../../../shared/services/user-service';
import { Photo } from '../../../shared/interfaces/user-response';

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
  galleryItems = signal<Photo[]>([]);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadGallery();
  }

  private loadGallery(): void {
    this.isLoading.set(true);
    this.error.set(null);
    
    this.userService.getGallery(this.user.id).subscribe({
      next: (photos) => {
        this.galleryItems.set(photos);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading gallery:', err);
        this.error.set('Error al cargar la galería');
        this.isLoading.set(false);
      }
    });
  }

}
