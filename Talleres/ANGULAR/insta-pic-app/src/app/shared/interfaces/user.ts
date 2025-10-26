export interface User{
    username:string;
    password:string;
    email?:string;
    name?:string;
    rePassword?:string;
    gallery?:string[];
}

export interface CreateUserRequest{
    username:string;
    password:string;
    email?:string;
    name?:string;
    avatarUrl?:string;
}