import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../../shared/services/user-service';
import { Router } from '@angular/router';
import { UserResponse } from '../../../shared/interfaces/user-response';

@Component({
  selector: 'app-find',
  imports: [],
  templateUrl: './find.html',
  styleUrl: './find.css'
})
export class Find implements OnInit{

  userService = inject(UserService);
  router = inject(Router);

  users: UserResponse[] = [];

  usersFiltered = signal<UserResponse[]>([]);

  ngOnInit(): void {
    this.usersFiltered.set([]);
    /*
    this.userService.findAll()
      .subscribe(response => {
        this.users = response;
        this.usersFiltered.set(response);
      })*/
  }

  onFind(username: string) {
    this.router.navigateByUrl(`home/${username}`);
  }

  onChat(userId: string) {
    this.router.navigateByUrl(`chat/${userId}`);
  }

  onFilter(event: Event) {
    let input = event.target as HTMLInputElement;
    const searchTerm = input.value.trim();
    
    if (searchTerm) {
      console.log(searchTerm)
      this.userService.findByUsername(searchTerm)
        .subscribe({
          next: (users) => {
            console.log(users)
            this.usersFiltered.set(users);
          },
          error: (error) => { // Este error no se esta ejecutando!
            console.error('Error finding user:', error);
            this.usersFiltered.set([]);
          }
        });
    } else {
      this.usersFiltered.set([]);
    }
  }

}
