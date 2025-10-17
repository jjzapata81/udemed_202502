import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { JwtService } from '../services/jwt-service';

export const authGuard: CanActivateFn = (route, state) => {


  const router = inject(Router);
  const authService = inject(Auth);
  const jwtService = inject(JwtService);
  
  if(!authService.isLoged()||jwtService.isTokenExpired()){
    router.navigateByUrl('');
    return false;
  }
  const user = jwtService.decodeToken();
  console.log(user);
  return true;
};
