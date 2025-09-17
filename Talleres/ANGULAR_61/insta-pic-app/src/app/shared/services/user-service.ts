import { Injectable } from '@angular/core';
import { v4 } from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  saveImage(username:string, imgeUrl:string){
  const galleryItem = {
    id:uuidv4(),
    url:imgeUrl,
    comments : []
  }
  
  let galleryStr = localStorage.getItem(`${username}_gallery`);
  if(galleryStr){
    let galleryItem = JSON.parse(galleryStr);
    galleryItem.push(galleryItem)
    localStorage.setItem(`${username}_gallery`, JSON.stringify(galleryItem));
    return;
  }

  const galleryItems = [galleryItem];
  localStorage.setItem(`${username}_gallery`,JSON.stringify(galleryItems));
}

getGallery(username:string){
  let galleryStr = localStorage.getItem(`${username}_gallery`);
  if(galleryStr){
    return JSON.parse(galleryStr);
  }
  return [];
}
}
