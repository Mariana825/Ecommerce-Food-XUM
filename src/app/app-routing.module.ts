import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

/**
 * Después del login, TODA la aplicación (las 5 interfaces) vive
 * bajo una única ruta protegida ('app'), cargada de forma perezosa
 * desde PrincipalModule. El cambio entre Desktop / Mobile /
 * Smartwatch / Tablet / Car ya NO se hace por rutas (así nunca se
 * pierde de vista qué dispositivo estaba seleccionado): lo decide
 * VistaService dentro de PrincipalComponent.
 */
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./features/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'app',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/principal/principal.module').then((m) => m.PrincipalModule)
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
