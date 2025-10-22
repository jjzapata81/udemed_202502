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