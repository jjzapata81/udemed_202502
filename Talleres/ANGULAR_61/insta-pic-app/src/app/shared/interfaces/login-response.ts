export interface LoginRespose{
    success:boolean;
    message?:string;
}

export interface SignUpResponse extends LoginRespose{

    redirectTo?:string;

}

export interface LoginServiceResponse{
    success:boolean;
    token:string;
}

export interface CreateUserResponse{
    success:boolean;
    token?:string;
    message?:string;
}