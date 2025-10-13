import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getToken } from '../utils/token-utils';

@Injectable()
export class BaseAuthGuard implements CanActivate {
  constructor(protected jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    let request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];
    if (!token) {
      throw new ForbiddenException('Sesión no autorizada');
    }
    try {
      const payload = this.jwtService.verify(getToken(token));
      //con el payload puedo validar el id del usuario
    } catch (error) {
      throw new ForbiddenException('Sesión expirada');
    }
    return true;
  }
}
