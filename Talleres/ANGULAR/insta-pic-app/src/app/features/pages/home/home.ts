import { Component, inject, signal } from '@angular/core';
import { Auth } from '../../../shared/services/auth';
import { UserService } from '../../../shared/services/user-service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  authService = inject(Auth);
  userService = inject(UserService);

  followers = 48;
  requests = 37;
  username = this.authService.getUserLogged().username;


  galleryItems = signal([]);

  ngOnInit():void{
  const user = this.userService.getUser(this.username);
  if(user){
    this.galleryItems.set(user.gallery);
  }
  }

}
