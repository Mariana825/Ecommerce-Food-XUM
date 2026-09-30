import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Producto } from '../../../core/interfaces/producto.interface';

@Component({
  selector: 'app-tarjeta-platillo',
  templateUrl: './tarjeta-platillo.component.html',
  styleUrls: ['./tarjeta-platillo.component.css']
})
export class TarjetaPlatilloComponent {
  /** Platillo a mostrar (viene tipado desde el componente padre). */
  @Input() producto!: Producto;

  /** Avisa al padre qué platillo se quiso agregar (solo demostrativo). */
  @Output() agregar = new EventEmitter<Producto>();

  alAgregar(): void {
    this.agregar.emit(this.producto);
  }
}
