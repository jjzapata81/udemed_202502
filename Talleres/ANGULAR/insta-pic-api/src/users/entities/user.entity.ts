export class User {
    id: string;
    username: string;
    password: string;
    email: string;
    fullName: string;
    avatarUrl?: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    photos?: string[];
}
