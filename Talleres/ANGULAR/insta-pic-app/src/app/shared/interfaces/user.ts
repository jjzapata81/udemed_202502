export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  url?: string;
}

export interface UserApiResponse {
  username: string;
  email: string;
  password: string;
  rePassword: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}
