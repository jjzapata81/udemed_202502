import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BaseGuard } from './base.guard';

@Injectable()
export class RoleGuard extends BaseGuard implements CanActivate {
  
  constructor(jwtService: JwtService) {
    super(jwtService);
  }
  
  canActivate(context: ExecutionContext): boolean {
    const token = this.getAuthorizationToken(context);
    const payload = this.verifyToken(token);
    const body = this.getRequestBody(context);
    
    this.validateUserAuthorization(payload, body);
    return true;
  }

  private validateUserAuthorization(payload: any, body: any): void {
    console.log('Token payload:', payload);
    
    if (payload['id'] !== body['userId']) {
      throw new ForbiddenException('Acción no autorizada');
    }
  }
}
  