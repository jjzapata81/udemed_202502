import { User } from "./user";

export interface UserResponse extends User {
  photos: Photo[];
}

export interface Photo {
  id: string;
  url: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  message: string;
}

export interface UploadImageResponse {
  id: string;
  url: string;
  userId: string;
  createdAt: Date;
}

export interface GalleryImage {
  id: string;
  url: string;
  createdAt: Date;
  comments: GalleryComment[];
  user: {
    id: string;
    username: string;
  };
}

export interface GalleryComment {
  id: string;
  message: string;
  createdAt: Date;
}

export interface SearchUser {
  id: string;
  username: string;
  name: string;
  email: string;
  avatarUrl?: string;
  isActive: boolean;
  createdAt: Date;
}