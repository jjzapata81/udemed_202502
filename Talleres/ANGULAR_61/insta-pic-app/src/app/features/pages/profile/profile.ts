import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../shared/services/user-service';
import { Auth } from '../../../shared/services/auth';
import { User } from '../../../shared/interfaces/user';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit{

  router = inject(Router);
  fb = inject(FormBuilder);
  userService = inject(UserService);
  authService = inject(Auth);

  user!:User;

  profileForm = this.fb.group({
    name: ['', [Validators.minLength(6)]],
    email: ['', [Validators.email]]
  })

  ngOnInit(): void {
    this.user = this.authService.getUserLogged();
  }
   onUpdate(){
    if(this.profileForm.valid){
      const { name, email} = this.profileForm.value;
      this.user.name = name || this.user.name;
      this.user.email = email || this.user.email;
      this.userService.update(this.user.id, {name:name!, email:email!})
        /*.subscribe(response=>{
          this.router.navigateByUrl('home');
        });*/
    }

  }

}
