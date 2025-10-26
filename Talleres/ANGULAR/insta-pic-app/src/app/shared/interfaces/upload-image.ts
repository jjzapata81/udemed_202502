export interface UploadImageRequest {
  userId: string;
  url: string;
}

export interface UploadImageResponse {
  id: string;
  url: string;
  userId: string;
  createdAt: string;
}

export interface ApiError {
  message: string;
  status: number;
}
