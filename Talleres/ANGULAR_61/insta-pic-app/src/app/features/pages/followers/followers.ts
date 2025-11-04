import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../../shared/services/user-service';
import { User } from '../../../shared/interfaces/user';
import { Auth } from '../../../shared/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-followers',
  imports: [],
  templateUrl: './followers.html',
  styleUrl: './followers.css'
})
export class Followers implements OnInit{

  userService = inject(UserService);
  authService = inject(Auth);

  router = inject(Router);

  followers: User[] = [];

  followersFiltered = signal<User[]>([]);

  ngOnInit(): void {
    const user = this.authService.getUserLogged();
    this.userService.getFollowers(user.id).subscribe(response=>{
      console.log(response)
        this.followers = response;
        this.followersFiltered.set(response);
      })
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
      this.followersFiltered.set(this.followers.filter(user =>
        this.validateMatch(user.name, term) ||
        this.validateMatch(user.email, term) ||
        this.validateMatch(user.username, term)
      ));
    }else{
      this.followersFiltered.set(this.followers);
    }
  }

  private validateMatch(value:string, term:string){
    if(!value) return false;
    return value.toLowerCase().includes(term);
  }

}
