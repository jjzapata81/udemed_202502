import { v4 as uuidv4 } from 'uuid';
import { Comment } from '../../comments/entities/comment.entity';

export class Photo {
  id: string;
  userId: string;
  url: string;
  createdAt: Date;
  comments: Comment[];

  constructor(userId: string, url: string) {
    this.id = uuidv4();
    this.userId = userId;
    this.url = url;
    this.createdAt = new Date();
    this.comments = [];
  }
}
