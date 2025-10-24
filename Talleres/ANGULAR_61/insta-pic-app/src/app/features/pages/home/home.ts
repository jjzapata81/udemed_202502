import { Component, inject, OnInit, signal } from '@angular/core';
import { Auth } from '../../../shared/services/auth';
import { UserService } from '../../../shared/services/user-service';
import { GalleryItem } from '../../../shared/interfaces/gallery-item';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{

  authService = inject(Auth);
  userService = inject(UserService);
  activatedRoute = inject(ActivatedRoute);
  followers = 48;
  requests = 37;
  user = this.authService.getUserLogged();
  galleryItems = signal<GalleryItem[]>([]);
  default = '/assets/no_avatar.webp'

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe(response=>{
        console.log(response)
        const username = response.get('username');
        const userSearch = username||this.authService.getUserLogged().id
        this.userService.findById(userSearch).subscribe(response=>{
          this.user = response;
          this.userService.getGallery(userSearch).subscribe(this.galleryItems.set);
        })
      })


  }

}
