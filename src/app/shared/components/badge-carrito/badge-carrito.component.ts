import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CarritoService } from '../../../core/services/carrito.service';

/**
 * Ícono de carrito + contador real, reutilizado en el header de
 * las 5 vistas (desktop, tablet, mobile, smartwatch, car).
 */
@Component({
  selector: 'app-badge-carrito',
  templateUrl: './badge-carrito.component.html',
  styleUrls: ['./badge-carrito.component.css']
})
export class BadgeCarritoComponent {
  @Input() pequeno: boolean = false;

  cantidadTotal$!: Observable<number>;

  constructor(private carritoService: CarritoService) {
    this.cantidadTotal$ = this.carritoService.cantidadTotal$;
  }
}
