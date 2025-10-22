export interface JwtPayload{
  id: string;
  username: string;
  name:string;
  email:string;
  url: string;
  iat: number;
  exp?:number;
}
