import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/Auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log(authService.isLoggedIn());
  

  if (authService.isLoggedIn()) {
    return true;
  }

  // Si no está logeado, redirigir al login
  router.navigate(['/auth']);
  return false;
};
