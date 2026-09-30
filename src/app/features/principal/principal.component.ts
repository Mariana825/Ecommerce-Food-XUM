import { Component, OnInit } from '@angular/core';
import { DeviceView } from '../../core/interfaces/vista.interface';
import { VistaService } from '../../core/services/vista.service';

/**
 * Contenedor post-login. Muestra la vista de dispositivo activa
 * (una de 5) y, siempre debajo, el selector de vista. Cambiar de
 * vista aquí es solo un *ngSwitch: ningún servicio se destruye,
 * así que la sesión y el carrito nunca se pierden.
 */
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  vista: DeviceView = 'desktop';

  constructor(private vistaService: VistaService) {}

  ngOnInit(): void {
    this.vistaService.vista$.subscribe((vista) => (this.vista = vista));
  }
}
