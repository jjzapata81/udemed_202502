
export class CreateUserDto {

    id: string;
    username: string;
    password: string;
    email: string;
    name: string;
    avatarUrl?: string;
    createAt?: Date;
    updateAt?: Date;
    isActive?: Boolean;
    photo?: [string];

}
