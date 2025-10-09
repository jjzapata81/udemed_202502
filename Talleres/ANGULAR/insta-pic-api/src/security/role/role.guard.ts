import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { getToken } from '../utils/token-utils';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Observable es asíncrono pero yo me suscribo a ese valor observablo, no se usa ni await ni async, cuando termine me notificara

    let request = context.switchToHttp().getRequest();

    const token = request.headers['authorization'];

    if (!token) {
      throw new ForbiddenException('Sesión no autorizada');
    }

    try {
      const payload = this.jwtService.verify(getToken(token));
      let userId = request.body['userId'];
      if (userId && userId == payload['id']) {
        throw new ForbiddenException('Accion no permitida');
      }
    } catch (error) {
      throw new ForbiddenException('sesion expirada');
    }

    return false;
  }
}
// El guard se encarga de validar si el usuario tiene permiso para acceder a un recurso
