export interface UploadedImage {
  id: string;
  userId: string;
  url: string;
}

export interface SaveImageResponse {
  success: boolean;
  message?: string;
}
