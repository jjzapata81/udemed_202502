export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  url:string;
}

export interface CreateUserDto {
  username: string;
  password: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface UploadImageDto {
  userId: string;
  url: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  avatar?: string;
}