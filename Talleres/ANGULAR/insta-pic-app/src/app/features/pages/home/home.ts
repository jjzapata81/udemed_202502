import { Component, inject, OnInit, signal } from '@angular/core';
import { Auth } from '../../../shared/services/auth';
import { UserService } from '../../../shared/services/user-service';
import { GalleryItem } from '../../../shared/interfaces/gallery-item';
import { ActivatedRoute } from '@angular/router';
import { UserResponse } from '../../../shared/interfaces/user-response';
import { Image } from '../../../shared/controls/image/image';
import { Comment } from '../../../shared/interfaces/comment';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [Image],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{

  authService = inject(Auth);
  userService = inject(UserService);
  activatedRoute = inject(ActivatedRoute);
  followers = 48;
  requests = 37;
  user!:UserResponse;
  galleryItems = signal<GalleryItem[]>([]);

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(response=>{
      const userId = response['userId']||this.authService.getUserLogged().id;
      this.userService.findById(userId).subscribe(response=>{
        this.user = response;
        this.userService.getGallery(userId).subscribe({
          next:response=>this.galleryItems.set(response),
          error:error=>alert('Ocurrio un error al cargar las imagenes')
        })
      })
      console.log('userID', userId);

    });

  }

  onSendComment(event:Comment){
    this.userService.addComment(this.authService.getUserLogged().id, event).subscribe(response=>{
      console.log(response)
    });
    
  }

}
