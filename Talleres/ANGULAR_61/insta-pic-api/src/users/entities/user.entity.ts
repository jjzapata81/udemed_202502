import { v4 as uuidv4 } from 'uuid';
import { Photo } from '../../photos/entities/photo.entity';

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
  photos: Photo[];

    constructor(partial: Partial<User>) {
    this.id = uuidv4();
    this.username = partial.username ?? ''; // valores como username, password, email, name y avatarUrl se inicializan con cadenas vacías si no se proporcionan
    this.password = partial.password ?? '';
    this.email = partial.email ?? '';
    this.name = partial.name ?? '';
    this.avatarUrl = partial.avatarUrl ?? '';
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.isActive = true;
    this.photos = [];
    }

}
