import { Component, inject, signal } from '@angular/core';
import { Auth } from '../../../shared/services/auth';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  authService = inject(Auth);
  followers = 48;
  requests = 37;
  username = this.authService.getUserLogged();
  galleryItems = signal(
    [ ]
  );

  ngOnInit(): void{

    
  }




  }


