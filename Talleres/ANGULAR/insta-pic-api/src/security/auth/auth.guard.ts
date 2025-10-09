import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { getToken } from '../utils/token-utils';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService) {}


  canActivate(context: ExecutionContext): boolean  {

    let request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];
    if(!token){
      throw new ForbiddenException('Sesion no autorizada');
    }

    try{
      const payload = this.jwtService.verify(getToken(token));
      //con el payload puedo validar el id del usuario 

      
    }catch(error){

      throw new ForbiddenException('Sesion expirada');
    }
    return true;
  }





    
}
