import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  saveImage(username: string, url: string) {
    const userString = localStorage.getItem(username);
    if (userString) {
      const user = JSON.parse(userString);
      user.gallery.push(url);
      localStorage.setItem(username, JSON.stringify(user));
    }
  }

  getUser(username: string) {
    const userString = localStorage.getItem(username);
    if (userString) {
      return JSON.parse(userString);
    } else {
      return;
    }
  }
}
