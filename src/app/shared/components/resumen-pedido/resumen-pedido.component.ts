import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CarritoService } from '../../../core/services/carrito.service';

@Component({
  selector: 'app-resumen-pedido',
  templateUrl: './resumen-pedido.component.html',
  styleUrls: ['./resumen-pedido.component.css']
})
export class ResumenPedidoComponent {
  /** Oculta el detalle de subtotal/envío en pantallas muy chicas si hace falta. */
  @Input() compacto: boolean = false;

  subtotal$!: Observable<number>;
  costoEnvio$!: Observable<number>;
  total$!: Observable<number>;
  cantidadTotal$!: Observable<number>;

  constructor(private carritoService: CarritoService) {
    this.subtotal$ = this.carritoService.subtotal$;
    this.costoEnvio$ = this.carritoService.costoEnvio$;
    this.total$ = this.carritoService.total$;
    this.cantidadTotal$ = this.carritoService.cantidadTotal$;
  }

  pagar(): void {
    if (this.carritoService.itemsActuales.length === 0) {
      return;
    }
    alert('Pedido confirmado (demo). ¡Gracias por tu compra en XUM!');
    this.carritoService.vaciar();
  }
}
