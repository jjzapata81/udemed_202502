import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BaseAuthGuard } from '../base-auth/base-auth.guard';

@Injectable()
export class RoleGuard extends BaseAuthGuard {
  constructor(protected jwtService: JwtService) {
    super(jwtService);
  }

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const token = request.headers['authorization'];
    const payload = this.jwtService.verify(token?.split(' ')[1]);

    const userId = request.body['userId'];
    if (userId && userId !== payload['id']) {
      throw new ForbiddenException('Acción no permitida');
    }
    console.log('RoleGuard - Acceso concedido');
    return true;
  }
}
