import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../shared/services/user-service';
import { Auth } from '../../../shared/services/auth';
import Swal from 'sweetalert2';
import { Storage } from '../../../shared/services/storage';
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
  storageService = inject(Storage);

  user!:User;

  profileForm = this.fb.group({
    name: ['', [Validators.minLength(6)]],
    email: ['', []]
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
        .subscribe(response=>{
          this.router.navigateByUrl('home');
        });
    }

  }

  onUploadFile(event:Event){
      const inputTarget = event.target as HTMLInputElement;
      if(!inputTarget.files || inputTarget.files.length <=0){
        return;
      }
      const imageFile = inputTarget.files[0];
      /*Swal.fire({
        title: 'Cargando...',
        text: 'Por favor espera',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });*/
      console.log('Subiendo')
      this.storageService.uploadAvatar(imageFile, this.user.username)
        .then(fullPath=>{
          const imageUrl = this.storageService.getUrl(fullPath);
          this.userService.update(this.user.id, {url:imageUrl}).subscribe(
            response=>{
              this.router.navigateByUrl('home');
            }
          );
        })
        .catch(error=>{
          console.log(error);
          Swal.fire({
            text:'Error al cargar la imagen',
            icon:'error'
          })
        });
      //Swal.close();
    }

}
