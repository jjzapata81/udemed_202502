import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService){}


  canActivate(context: ExecutionContext): boolean {

    let request = context.switchToHttp().getRequest();
    const token = request.headers["authorization"];

    if(!token){
      throw new ForbiddenException('Sesion expirada');
    }

    try {
      const payload = this.jwtService.verify(token);
      console.log(payload);
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Sesion expirada');
    }
    return false;
  }

  private getToken(token: string) {
    let tokenAux = token.split(' ');
    if(tokenAux.length > 1){
      return tokenAux[1];
    }
    return token;
  }
}
