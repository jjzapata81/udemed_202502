import { Component, inject, signal } from '@angular/core';
import { Auth } from '../../../shared/services/auth';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  authService = inject(Auth);

  followers = 48;
  requests = 37;
  username = this.authService.getUserLogged();

  galleryItems = signal(
    [
      {
        id: 1,
        url: '/assets/gallery0.jpg',
        comments: ['Hola', 'Bien']
      },/*
      {
        id: 2,
        url: '/assets/gallery1.jpg',
        comments: ['Hola', 'Bien']
      },
      {
        id: 3,
        url: '/assets/gallery2.webp',
        comments: []
      },
      {
        id: 4,
        url: '/assets/gallery3.jpeg',
        comments: []
      },
      {
        id: 5,
        url: '/assets/gallery4.jpg',
        comments: []
      },
      {
        id: 6,
        url: '/assets/gallery5.jpg',
        comments: []
      },
      {
        id: 7,
        url: '/assets/gallery6.jpg',
        comments: []
      },
      {
        id: 8,
        url: '/assets/gallery7.jpg',
        comments: ['Hola', 'Bien']
      },
      {
        id: 9,
        url: '/assets/gallery8.webp',
        comments: []
      },
      {
        id: 10,
        url: '/assets/gallery9.avif',
        comments: []
      }*/
    ]
  );

  galleryItems2: any = [];


  onUpload() {

    let newImage = {
      id: 2,
      url: '/assets/gallery1.jpg',
      comments: ['Hola', 'Bien']
    };

    this.galleryItems2.push(newImage);
    console.log(this.galleryItems2);

    this.galleryItems.update(value => {
      return [...value, newImage]
    })

  }


}
