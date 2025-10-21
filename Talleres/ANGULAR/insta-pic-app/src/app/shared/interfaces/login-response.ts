export interface AuthResponse {
  success: boolean;
  message?: string;
}

export interface SignUpResponse extends AuthResponse {
  token: string;

  redirectTo?: string;
}

export interface AuthServiceResponse {
  success: boolean;
  token: string;
}

export interface SignUpServiceResponse {
  success: boolean;
  token: string;
  message?: string;
}
