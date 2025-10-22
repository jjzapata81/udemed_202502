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

export interface SignUpRequest {
    username: string;
    password: string;
    email?: string;
    name?: string;
    url?: string;
}

export interface SignUpServiceResponse {
    success: boolean;
    token: string;
    message?: string;
}
