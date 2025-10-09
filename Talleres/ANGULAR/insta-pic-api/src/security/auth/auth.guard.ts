import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { getToken } from '../utils/token-utils';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean {

    let request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];
    if (!token) {
      throw new ForbiddenException('Sesión no autorizada');
    }

    try {
      const payload = this.jwtService.verify(getToken(token));
      
      // con el payload puedo validar el id del usuario
      /*console.log(payload);
      let userId = request.body['userId'];
      if (userId && userId === payload['id']){
        console.log('Es el mismo usuario')
      }*/
    } catch (error){
      console.log(error);
      throw new ForbiddenException('Sesión expirada');
    }
    return true;
  }
}
