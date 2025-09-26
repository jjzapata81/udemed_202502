import { v4 as uuidv4 } from 'uuid';

export class Comment {
  id: string;
  userId: string;
  photoId: string;
  message: string;
  createdAt: Date;

  constructor(userId: string, photoId: string, message: string) {
    this.id = uuidv4();
    this.userId = userId;
    this.photoId = photoId;
    this.message = message;
    this.createdAt = new Date();
  }
}
