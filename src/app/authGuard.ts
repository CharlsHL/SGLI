import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService }from './servicios/auth.service'
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // Permite el acceso si el usuario está logueado
  } else {
    router.navigate(['/login']); // Redirige a la página de login si no está autenticado
    return false; // Bloquea el acceso
  }
};