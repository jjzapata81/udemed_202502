import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BaseGuard } from './base.guard';

@Injectable()
export class AuthGuard extends BaseGuard implements CanActivate {

  constructor(jwtService: JwtService) {
    super(jwtService);
  }
  
  canActivate(context: ExecutionContext): boolean {
    const token = this.getAuthorizationToken(context);
    this.verifyToken(token);
    return true;
  }
}
