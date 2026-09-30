import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceView, OpcionVista } from '../../../core/interfaces/vista.interface';
import { VistaService } from '../../../core/services/vista.service';

/**
 * Barra inferior, SIEMPRE visible tras el login, con los 5 botones
 * para cambiar de interfaz. Vive fuera de las 5 vistas (en
 * PrincipalComponent), así que nunca se destruye al cambiar entre
 * ellas: es el control maestro de VistaService.
 */
@Component({
  selector: 'app-selector-vista',
  templateUrl: './selector-vista.component.html',
  styleUrls: ['./selector-vista.component.css']
})
export class SelectorVistaComponent {

  readonly opciones: OpcionVista[] = [
    { id: 'desktop', etiqueta: 'Pantalla' },
    { id: 'mobile', etiqueta: 'App móvil' },
    { id: 'smartwatch', etiqueta: 'Reloj' },
    { id: 'tablet', etiqueta: 'Tablet' },
    { id: 'car', etiqueta: 'Auto' }
  ];

  vista$!: Observable<DeviceView>;

  constructor(private vistaService: VistaService) {
    this.vista$ = this.vistaService.vista$;
  }

  elegir(vista: DeviceView): void {
    this.vistaService.cambiarVista(vista);
  }
}
