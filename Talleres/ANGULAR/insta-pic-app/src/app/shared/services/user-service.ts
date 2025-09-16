import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  saveImage(username: string, url:string){
    let userString = localStorage.getItem(username)

    if(userString){
      let user = JSON.parse(userString);
      user.gallery.push(url);
      console.log(user)
      localStorage.setItem(username, JSON.stringify(user));
    }

  }
  

  getUser(username:string){
    let userString = localStorage.getItem(username)
    if(userString){
      return JSON.parse(userString);

    }else{
      return;
    }
  }
}

