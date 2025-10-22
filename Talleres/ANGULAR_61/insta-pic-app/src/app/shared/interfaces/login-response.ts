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