export class CreateUserModuleDto {
    id: string;
    username: string;
    password: string;
    email: string;
    name: string;
    avatarUrl?: string;
    createdAt?: Date;
    updatedAt?: Date;
    isActive?: boolean;
    photos?: [];
}
