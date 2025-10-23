import { Component, inject, OnInit, signal } from '@angular/core';
import { Auth } from '../../../shared/services/auth';
import { UserService } from '../../../shared/services/user-service';
import Swal from 'sweetalert2';
import { Photo } from '../../../shared/interfaces/user-response';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  authService = inject(Auth);
  userService = inject(UserService);
  followers = 48;
  requests = 37;
  user = this.authService.getUserLogged();

  galleryItems = this.userService.galleryItems; // Este es un puntero al objeto galleryItems del userService.

  ngOnInit(): void {
    this.userService.getGallery(this.user.id).subscribe({
      next: (userGallery: Photo[]) => {
        console.log('Galeria cargada exitosamente:', userGallery);
      },
      error: (error) => {
        Swal.fire({
            title: "Error cargando tus imagenes..",
            text: error,
            icon: "error"
        });
      }
    });
  }


}
