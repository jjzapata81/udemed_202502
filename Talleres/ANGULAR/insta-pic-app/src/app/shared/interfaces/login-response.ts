export interface LoginRespose{ // Respuesta del login
    success:boolean;
    message?:string;
}

export interface SignUpResponse extends LoginRespose{ // Extiende de LoginRespose

    redirectTo?:string;

}

export interface LoginServiceResponse{ // Respuesta del servicio de login
    success:boolean;
    token:string;
}

export interface SignUpServiceResponse{ // Respuesta del servicio de sign-up
    success: boolean;
    token?: string;
    message?: string;
}

/** ====== Subir foto ====== **/

// Lo que ENVIAS al backend (coincide con tu UploadPhotoDto del server)
export interface ImageUploadDto {
  userId: string;   // en tu backend es string
  url: string;
}

// Respuesta que el front USARÁ SIEMPRE (plana y predecible)
export interface ImageUploadResponse {
  success: boolean;         // <-- OBLIGATORIO
  message?: string;
  id?: string;
  url?: string;
  userId?: string;
}