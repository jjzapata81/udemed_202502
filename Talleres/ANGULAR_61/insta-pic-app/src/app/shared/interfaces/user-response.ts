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

export interface PhotoUploadResponse {
  id: string;
  url: string;
  createdAt: string;
  comments: Comment[];
  user: User;
}
