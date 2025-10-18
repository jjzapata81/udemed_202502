export interface UserResponse {
  id: string;
  username: string;
  name: string;
  email: string;
  photos: Photo[];
}

export interface Photo{
  id:string;
  url:string;
  comments: Comment[];
}

export interface Comment{
  id:string;
  userId:string;
  message:string;
}
