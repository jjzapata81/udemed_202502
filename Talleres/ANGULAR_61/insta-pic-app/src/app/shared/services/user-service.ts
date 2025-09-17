import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  saveImage(username:String, imageUrl:String) {

  const galleryItem = {
    id: uuidv4(),
    url:imageUrl,
    comments: []
  }

  let galleryStr = localStorage.getItem(`${username}_gallery`);

  if (galleryStr) {
    const galleryItems = JSON.parse(galleryStr);
    galleryItems.push(galleryItem);
    localStorage.setItem(`${username}_gallery`, JSON.stringify(galleryItems));
    return;

  }  
   
    //Crear
    const galleryItems = [galleryItem];
    localStorage.setItem(`${username}_gallery`, JSON.stringify([galleryItem]));
   }

  getGallery(username: String) {

    let galleryStr = localStorage.getItem(`${username}_gallery`);
    if (galleryStr) {
      const galleryItems = JSON.parse(galleryStr);
      return galleryItems;
    }
    return [];
  }
}
