import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemCarrito } from '../../../core/interfaces/carrito.interface';
import { CarritoService } from '../../../core/services/carrito.service';

/**
 * Lista de renglones del carrito, con controles de cantidad y
 * eliminar. La usan desktop, tablet y mobile (compacto=true la
 * hace más angosta). Smartwatch y car usan su propia vista, más
 * reducida, pero todas leen del mismo CarritoService.
 */
@Component({
  selector: 'app-carrito-lista',
  templateUrl: './carrito-lista.component.html',
  styleUrls: ['./carrito-lista.component.css']
})
export class CarritoListaComponent {
  @Input() compacto: boolean = false;
  @Output() irAlMenu = new EventEmitter<void>();

  items$!: Observable<ItemCarrito[]>;

  constructor(private carritoService: CarritoService) {
    this.items$ = this.carritoService.items$;
  }

  incrementar(idProducto: number): void {
    this.carritoService.incrementar(idProducto);
  }

  decrementar(idProducto: number): void {
    this.carritoService.decrementar(idProducto);
  }

  quitar(idProducto: number): void {
    this.carritoService.quitar(idProducto);
  }
}
