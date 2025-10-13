import { ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export abstract class BaseGuard {
  
  constructor(protected jwtService: JwtService) {}

  protected getAuthorizationToken(context: ExecutionContext): string {
    const request = context.switchToHttp().getRequest();
    const authorization = request.header('authorization');
    
    if (!authorization) {
      throw new ForbiddenException('Acceso no autorizado');
    }
    
    return this.extractTokenFromHeader(authorization);
  }

  protected verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      console.log('Token verification error:', error.message);
      throw new ForbiddenException(error.message || 'Token no válido');
    }
  }

  private extractTokenFromHeader(authorization: string): string {
    const tokenParts = authorization.split(' ');
    return tokenParts.length > 1 ? tokenParts[1] : tokenParts[0];
  }

  protected getRequestBody(context: ExecutionContext): any {
    const request = context.switchToHttp().getRequest();
    return request.body;
  }
}