export interface UploadPhotoResponse {
    success: boolean;
    message?: string;
}

export interface Photo {
    id: string;
    url: string;
    userId: string;
    comments?: Comment[];
}
