import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {


  const router = inject(Router);
  const authService = inject(Auth);

  if(!authService.isLoged()||authService.isTokenExpired()){
    router.navigateByUrl('');
    return false;
  }
  const user = authService.getUserLogged();
  console.log(user);
  return true;
};
