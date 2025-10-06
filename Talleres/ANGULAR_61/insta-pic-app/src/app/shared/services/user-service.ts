import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  saveImage(username:string, imageUrl:string){

    const galleryItem = {
      id: uuidv4(),
      url:imageUrl,
      comments:[]
    }

    let galleryStr = localStorage.getItem(`${username}_gallery`);

    if(galleryStr){
      let galleryItems = JSON.parse(galleryStr);
      galleryItems.push(galleryItem)
      localStorage.setItem(`${username}_gallery`, JSON.stringify(galleryItems));
      return;
    }

    const galleryItems = [galleryItem];
    localStorage.setItem(`${username}_gallery`, JSON.stringify(galleryItems));
  }

  getGallery(username:string){
    let galleryStr = localStorage.getItem(`${username}_gallery`);
    if(galleryStr){
      return JSON.parse(galleryStr);
    }
    return [];

  }
  
}
