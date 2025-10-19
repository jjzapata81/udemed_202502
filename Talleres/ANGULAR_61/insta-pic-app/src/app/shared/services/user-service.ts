import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  saveImage(userId:string, url:string){

    const galleryItem = {
      id: uuidv4(),
      url:url,
      comments:[]
    }

    let galleryStr = localStorage.getItem(`${userId}_gallery`);

    if(galleryStr){
      let galleryItems = JSON.parse(galleryStr);
      galleryItems.push(galleryItem)
      localStorage.setItem(`${userId}_gallery`, JSON.stringify(galleryItems));
      return;
    }

    const galleryItems = [galleryItem];
    localStorage.setItem(`${userId}_gallery`, JSON.stringify(galleryItems));
  }

  getGallery(userId:string){
    let galleryStr = localStorage.getItem(`${userId}_gallery`);
    if(galleryStr){
      return JSON.parse(galleryStr);
    }
    return [];

  }

  findAll() {
    //throw new Error('Method not implemented.');
  }

  update(userId:string, user:Partial<User>) {

  }
}
