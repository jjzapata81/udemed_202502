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
    this.userService.findAll()
      /*.subscribe(response => {
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
    if (input.value) {
      const term = input.value.toLowerCase();
      this.usersFiltered.set(this.users.filter(user =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.username.toLowerCase().includes(term)
      ));
    }else{
      this.usersFiltered.set(this.users);
    }
  }

}
