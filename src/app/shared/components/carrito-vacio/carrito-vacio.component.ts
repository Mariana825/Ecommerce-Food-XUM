import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-carrito-vacio',
  templateUrl: './carrito-vacio.component.html',
  styleUrls: ['./carrito-vacio.component.css']
})
export class CarritoVacioComponent {
  /** El padre decide qué hacer (cada vista tiene su propia forma de "ir al menú"). */
  @Output() irAlMenu = new EventEmitter<void>();
}
