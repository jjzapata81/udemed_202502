export class CreateUserDto {
  username: string;
  password: string;
  email: string;
  name: string;
  avatar?: string;
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
}
