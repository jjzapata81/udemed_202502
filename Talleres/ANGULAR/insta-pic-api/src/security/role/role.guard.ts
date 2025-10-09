import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { ForbiddenException } from '@nestjs/common';
import { getToken } from '../utils/token-utils';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
    canActivate(context: ExecutionContext): boolean {
  
      let request = context.switchToHttp().getRequest();
      const token = request.headers['authorization'];
      if (!token) {
        throw new ForbiddenException('Sesión no autorizada');
      }
  
      try {
        const payload = this.jwtService.verify(getToken(token));
        let userId = request.body['userId'];
        if (userId && userId !== payload['id']){
          throw new ForbiddenException('Acción no permitida');
        }
      } catch (error){
        throw new ForbiddenException('Sesión expirada');
      }
      return true;
    }
}
