import { v4 as uuidv4 } from 'uuid';

export class User {
  id: string;
  username: string;
  password: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  avatar: string;
  isActive: boolean;

  constructor() {
    this.id = uuidv4();
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.isActive = true;
  }
}
