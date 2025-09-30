export class CreateUserDto {
  id: string;
  username: string;
  password: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createAt?: string;
  updateAt?: string;
  isActive?: boolean;
  photo?: [string];
}
