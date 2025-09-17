import { Injectable } from '@angular/core';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  saveImage(username: string, imageUrl: string) {

    const galleryItem = {
      id: uuid(),
      url: imageUrl,
      comments: []
    }

    let galleryStr = localStorage.getItem(`${username}_gallery`);

    if (galleryStr) {
      let galleryItems = JSON.parse(galleryStr);
      galleryItems.push(galleryItem);
      return;
    }

    const galleryItems = [galleryItem];
    localStorage.setItem(`${username}_gallery`, JSON.stringify(galleryItems));
    // create
  }

  getGallery(username: string) {
    let galleryStr = localStorage.getItem(`${username}_gallery`);
    if (galleryStr) {
      return JSON.parse(galleryStr);
    }
    return [];

  }
}
