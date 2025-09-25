import { v4 as uuid } from 'uuid';

export class User {
  id: string;
  username: string;
  password: string;
  email: string;
  name: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  photos: string[];

  constructor(partial: Partial<User>) {
    this.id = uuid();
    this.username = partial.username || '';
    this.password = partial.password || '';
    this.email = partial.email || '';
    this.name = partial.name || '';
    this.avatarUrl = partial.avatarUrl || '';
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.isActive = true;
    this.photos = partial.photos || [];
  }
}
