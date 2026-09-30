import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Impide entrar a rutas protegidas (inicio, menú, carrito) si no hay
 * una sesión persistida. Si no hay sesión, redirige a /login.
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.authService.estaAutenticado()) {
      return true;
    }
    return this.router.parseUrl('/login');
  }
}
