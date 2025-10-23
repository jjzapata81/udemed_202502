import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../shared/services/user-service';
import { Auth } from '../../../shared/services/auth';
import Swal from 'sweetalert2';
import { Storage } from '../../../shared/services/storage';
import { User, UpdateUserDto } from '../../../shared/interfaces/user';

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
    email: ['', [Validators.email]]
  })

  ngOnInit(): void {
    this.user = this.authService.getUserLogged();
  }
  onUpdate(){
    if(this.profileForm.valid){
      const { name, email} = this.profileForm.value;
      
      const updateData: UpdateUserDto = {
        name: name || undefined,
        email: email || undefined
      };

      this.userService.update(this.user.id, updateData).subscribe({
        next: (response) => {
          if(response.success) {
            this.user.name = name || this.user.name;
            this.user.email = email || this.user.email;
            Swal.fire({
              text: 'Perfil actualizado exitosamente',
              icon: 'success'
            });
            this.router.navigateByUrl('home');
          } else {
            Swal.fire({
              text: response.message || 'Error al actualizar el perfil',
              icon: 'error'
            });
          }
        },
        error: (error) => {
          console.error('Error al actualizar perfil:', error);
          Swal.fire({
            text: error.message || 'Error al actualizar el perfil',
            icon: 'error'
          });
        }
      });
    } else {
      Swal.fire({
        text: 'Por favor completa los campos correctamente',
        icon: 'warning'
      });
    }
  }

  onUploadFile(event:Event){
      const inputTarget = event.target as HTMLInputElement;
      if(!inputTarget.files || inputTarget.files.length <=0){
        return;
      }
      const imageFile = inputTarget.files[0];
      
      Swal.fire({
        title: 'Cargando...',
        text: 'Por favor espera',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      
      this.storageService.uploadAvatar(imageFile, this.user.username)
        .then(fullPath=>{
          const imageUrl = this.storageService.getUrl(fullPath);
          const updateData: UpdateUserDto = {
            avatar: imageUrl
          };
          
          this.userService.update(this.user.id, updateData).subscribe({
            next: (response) => {
              Swal.close();
              if(response.success) {
                this.user.url = imageUrl;
                Swal.fire({
                  text: 'Avatar actualizado exitosamente',
                  icon: 'success'
                });
              } else {
                Swal.fire({
                  text: response.message || 'Error al actualizar el avatar',
                  icon: 'error'
                });
              }
            },
            error: (error) => {
              Swal.close();
              console.error('Error al actualizar avatar:', error);
              Swal.fire({
                text: error.message || 'Error al actualizar el avatar',
                icon: 'error'
              });
            }
          });
        })
        .catch(error=>{
          Swal.close();
          console.log(error);
          Swal.fire({
            text:'Error al cargar la imagen',
            icon:'error'
          })
        });
    }

}
