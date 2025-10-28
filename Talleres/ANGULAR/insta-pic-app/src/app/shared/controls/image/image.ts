import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GalleryItem } from '../../interfaces/gallery-item';
import { Comment } from '../../interfaces/comment';

@Component({
  selector: 'app-image',
  imports: [],
  templateUrl: './image.html',
  styleUrl: './image.css'
})
export class Image {

  @Input('gallery-item') image!:GalleryItem;

  @Output()
  addComment = new EventEmitter<Comment>();

  onAddComment(event:Event, id:string){
    const input = event.target as HTMLInputElement;
    if(!input.value){
      return;
    }
    console.log(input.value)
    this.addComment.emit({message:input.value, photoId:id});
    input.value = '';

  }

}
