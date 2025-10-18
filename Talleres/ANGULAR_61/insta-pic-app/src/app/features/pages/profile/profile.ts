import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../shared/services/user-service';
import { Auth } from '../../../shared/services/auth';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {

  router = inject(Router);
  fb = inject(FormBuilder);
  userService = inject(UserService);
  authService = inject(Auth);

  profileForm = this.fb.group({
    name: ['', [Validators.minLength(6)]],
    email: ['', [Validators.email]]
  })

  onUpdate(){
     const user = this.authService.getUserLogged();
    if(this.profileForm.valid && user){
      const { name, email} = this.profileForm.value;
      this.userService.update(user.id, name, email)
        /*.subscribe(response=>{
          this.router.navigateByUrl('home');
        });*/
    }

  }

}
