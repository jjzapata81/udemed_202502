export interface User{
    username:string;
    password:string;
    email?:string;
    name?:string;
}

export interface CreateUserRequest{
    username:string;
    password:string;
    email?:string;
    name?:string;
    avatarUrl?:string;
}