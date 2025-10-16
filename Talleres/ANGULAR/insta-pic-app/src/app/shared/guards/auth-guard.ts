import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {


  const router = inject(Router);
  const authService = inject(Auth);

 /* console.log({
    ruta:route,
    estado:state
  })
*/
  if(!authService.isLogged()){
    router.navigateByUrl('')
    return false;
  }

  return true;
};
