export class User {
    id: string; // uuid
    username: string;
    password: string;
    name: string;
    email: string;
    avatarUrl?: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    photos: any[];

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}
