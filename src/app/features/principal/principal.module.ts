import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { PrincipalComponent } from './principal.component';
import { DesktopVistaComponent } from './vistas/desktop/desktop-vista.component';
import { TabletVistaComponent } from './vistas/tablet/tablet-vista.component';
import { MobileVistaComponent } from './vistas/mobile/mobile-vista.component';
import { SmartwatchVistaComponent } from './vistas/smartwatch/smartwatch-vista.component';
import { CarVistaComponent } from './vistas/car/car-vista.component';
import { HolaComponent } from 'src/app/hola/hola.component';


const rutas: Routes = [
  { path: '', component: PrincipalComponent }
];

/**
 * el mdulo de la aplicación ya autenticada, se agrupa el contenedor principal y las 5 vistas de dispositivo
 * todas tiene sharedmodule encabezado footer, tarjeta, carritoLista, resumen(no hay componentes duplicados)
 */
@NgModule({
  declarations: [
    PrincipalComponent,
    DesktopVistaComponent,
    TabletVistaComponent,
    MobileVistaComponent,
    SmartwatchVistaComponent,
    CarVistaComponent,
    HolaComponent
  ],
  imports: [SharedModule, RouterModule.forChild(rutas)]
})
export class PrincipalModule {}
