import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../shared/services/user-service';
import { JwtService } from '../../../shared/services/jwt-service';
import { ChatService } from '../../../shared/services/chat-service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { JwtPayload } from '../../../shared/interfaces/jwt-payload';

@Component({
  selector: 'app-chat',
  imports: [ReactiveFormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class Chat implements OnInit{

   chatService = inject(ChatService);
  jwtService = inject(JwtService);
  activatedRoute = inject(ActivatedRoute);
  userService = inject(UserService);

  router = inject(Router);

  fb = inject(FormBuilder);

  chatForm = this.fb.group({
    message:['']
  })


  user: JwtPayload | null = null;
  userTo!:any;
  //userTo!: UserResponse;

  ngOnInit(): void {
   /* this.user = this.tokenService.decodeToken();
    this.activatedRoute.paramMap.subscribe(param=>{
      const userId = param.get('userId');
      if(userId && this.user){
        this.userService.findById(userId).subscribe(response=>{
          this.userTo = response;
          this.chatService.fetchMessages(this.user!.id, this.userTo.id);
        })
      }else{
        this.router.navigateByUrl('');
      }
    })*/
  }


  sendMessage() {
    const message = this.chatForm.value.message;
    if (!message || !message.trim()) return;
    if(!this.user) return;
    this.chatService.sendMessage(this.user.id, this.userTo.id, message);
    this.chatForm.setValue({message:''});
  }

}
