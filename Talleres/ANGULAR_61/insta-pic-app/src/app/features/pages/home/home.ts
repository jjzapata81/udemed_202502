import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Auth } from '../../../shared/services/auth';
import { UserService } from '../../../shared/services/user-service';
import { GalleryItem } from '../../../shared/interfaces/gallery-item';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../../shared/services/chat-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {

  authService = inject(Auth);
  userService = inject(UserService);
  activatedRoute = inject(ActivatedRoute);
  chatService = inject(ChatService);
  router = inject(Router);
  followers = 48;
  requests = 37;
  user = this.authService.getUserLogged();
  galleryItems = signal<GalleryItem[]>([]);
  default = '/assets/no_avatar.webp'
  subscription: any;

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe(response => {
        console.log(response)
        const username = response.get('username');
        const userSearch = username || this.authService.getUserLogged().id
        this.userService.findById(userSearch).subscribe(response => {
          this.user = response;
          this.userService.getGallery(userSearch).subscribe(this.galleryItems.set);
        })
      });
    this.subscription = this.chatService
      .subscribeToMessages(this.user.id, (payload) => {
        this.showNewMessage(payload.new);
      })
      .subscribe(console.log);


  }

  showNewMessage(payload:any){
    Swal.fire({
      title: '¡Tienes un nuevo mensaje!',
      text:payload.content,
      icon: 'info',
      toast: true,
      position: 'top-end',
      showConfirmButton: true,
      timer: 5000,
      timerProgressBar: true,
      confirmButtonText: 'Ver Mensaje',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(
          ['/chat', payload.sender_id]
        );
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }



}
