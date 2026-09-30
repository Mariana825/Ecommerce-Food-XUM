import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from '../../../core/interfaces/usuario.interface';
import { AuthService } from '../../../core/services/auth.service';
import { CarritoService } from '../../../core/services/carrito.service';

export type SeccionEncabezado = 'inicio' | 'desayuno' | 'almuerzo' | 'cena' | 'carrito';

/**
 * Header reutilizado por las vistas Desktop y Tablet. Ya no navega
 * con el Router: emite eventos para que cada vista decida qué
 * mostrar en su propia área de contenido, sin perder el estado
 * de la vista de dispositivo seleccionada.
 */
@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {

  @Input() seccionActiva: SeccionEncabezado = 'inicio';
  @Output() seleccionar = new EventEmitter<SeccionEncabezado>();
  @Output() salir = new EventEmitter<void>();

  usuario: Usuario | null = null;

  constructor(private authService: AuthService, private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuarioActual();
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion();
    this.carritoService.vaciar();
    this.salir.emit();
  }
}
