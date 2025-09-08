import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  posts = 25;
  followers = 48;
  requests = 37;

  galleryItems = signal([
    {
      id: 1,
      url: '/assets/gallery0.jpg',
      comments: ['Hola', 'Bien']
    },
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
    }
  ]);



}
