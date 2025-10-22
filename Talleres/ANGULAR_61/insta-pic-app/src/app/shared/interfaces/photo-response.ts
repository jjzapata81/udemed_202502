export interface SaveImageRequest {
    userId: string;
    url: string;
}

export interface SaveImageResponse {
    success: boolean;
    message?: string;
    photo?: {
        id: string;
        url: string;
        userId: string;
    };
}
