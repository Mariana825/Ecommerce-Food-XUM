import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { FooterComponent } from './components/footer/footer.component';
import { TarjetaPlatilloComponent } from './components/tarjeta-platillo/tarjeta-platillo.component';
import { CarritoVacioComponent } from './components/carrito-vacio/carrito-vacio.component';
import { ResumenPedidoComponent } from './components/resumen-pedido/resumen-pedido.component';
import { BadgeCarritoComponent } from './components/badge-carrito/badge-carrito.component';
import { CarritoListaComponent } from './components/carrito-lista/carrito-lista.component';
import { SelectorVistaComponent } from './components/selector-vista/selector-vista.component';

/**
 * Módulo compartido: agrupa los componentes que se repiten en más
 * de una vista (Encabezado, Footer, Tarjeta de platillo, Carrito, etc.).
 * Cualquier vista de dispositivo que necesite alguno de estos solo
 * tiene que importar SharedModule. Es la pieza clave para no duplicar
 * código entre las 5 interfaces.
 */
@NgModule({
  declarations: [
    EncabezadoComponent,
    FooterComponent,
    TarjetaPlatilloComponent,
    CarritoVacioComponent,
    ResumenPedidoComponent,
    BadgeCarritoComponent,
    CarritoListaComponent,
    SelectorVistaComponent
  ],
  imports: [CommonModule],
  exports: [
    CommonModule,
    EncabezadoComponent,
    FooterComponent,
    TarjetaPlatilloComponent,
    CarritoVacioComponent,
    ResumenPedidoComponent,
    BadgeCarritoComponent,
    CarritoListaComponent,
    SelectorVistaComponent
  ]
})
export class SharedModule {}
