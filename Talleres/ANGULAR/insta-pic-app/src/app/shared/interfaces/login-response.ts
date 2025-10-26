export interface LoginResponse{
    success:boolean;
    redirectTo?:string;
}

export interface SignUpResponse extends LoginResponse{
    message?:string;
};

export interface LoginServiceResponse{
    success:boolean;
    token:string;
    userId?:string;
}

export interface CreateUserResponse{
    success:boolean;
    token?:string;
    message?:string;
}