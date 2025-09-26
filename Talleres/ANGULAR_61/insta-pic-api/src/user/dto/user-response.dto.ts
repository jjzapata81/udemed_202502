export class UserResponseDto {
    id: string;
    username: string;
    name: string;
    email: string;
    avatarUrl?: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    photos: any[];
}