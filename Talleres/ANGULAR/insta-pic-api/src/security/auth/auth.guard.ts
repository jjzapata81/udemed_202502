import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { getToken } from '../utils/token-utils';
import { BaseAuthGuard } from '../base-auth/base-auth.guard';

@Injectable()
export class AuthGuard extends BaseAuthGuard {
  constructor(protected jwtService: JwtService) {
    super(jwtService);
  }
}
