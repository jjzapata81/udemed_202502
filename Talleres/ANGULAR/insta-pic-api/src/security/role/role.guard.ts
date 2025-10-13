import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { getToken } from '../utils/token-utils';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private jwtService:JwtService){}
  
    canActivate(context: ExecutionContext): boolean{
      
      let request= context.switchToHttp().getRequest();
      const token = request.headers['authorization'];
      if(!token){
        throw new ForbiddenException("Sesión no autorizada");
      }
  
      try{
        const payload = this.jwtService.verify(getToken(token));
        let userId = request.body['userId'];
        if(userId && userId!==payload['id']){
          throw new ForbiddenException("Accion no permitida");
        }
      }catch(error){
        console.log(error);
        throw new ForbiddenException("Sesión expirada");
      }
      return true;
    }

}