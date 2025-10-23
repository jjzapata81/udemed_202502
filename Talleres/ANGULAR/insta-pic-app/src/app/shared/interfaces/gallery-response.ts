export interface GalleryApiResponse {
  userId: string;
  url: string;
  id: string;
  user: {
    username: string;
    email: string;
    password: string;
    rePassword: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
  };
  createdAt: string;
  comments: any[];
}

export interface GalleryItem {
  id: string;
  url: string;
  comments: any[];
}
