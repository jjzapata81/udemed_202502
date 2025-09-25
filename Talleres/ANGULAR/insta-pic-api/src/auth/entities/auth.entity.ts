export class Auth {
  id: string;
  userId: string;
  token: string;
  refreshToken?: string;
  expiresAt: Date;
  createdAt: Date;
  isActive: boolean;

  constructor() {
    this.id = '';
    this.userId = '';
    this.token = '';
    this.expiresAt = new Date();
    this.createdAt = new Date();
    this.isActive = true;
  }
}
