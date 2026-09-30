import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { CarritoService } from '../../../../core/services/carrito.service';
import { ProductoService } from '../../../../core/services/producto.service';
import { DesktopVistaComponent } from '../desktop/desktop-vista.component';

/**
 * Vista 4: Tablet. Reutiliza TODA la lógica de DesktopVistaComponent
 * (extiende la clase) para no duplicar código: mismo header, mismo
 * manejo de inicio/menú/carrito, mismo consumo de API. Lo único que
 * cambia es la plantilla/estilos, que envuelven el contenido en un
 * marco proporcional a una tablet.
 */
@Component({
  selector: 'app-vista-tablet',
  templateUrl: '../desktop/desktop-vista.component.html',
  styleUrls: ['./tablet-vista.component.css']
})
export class TabletVistaComponent extends DesktopVistaComponent {
  constructor(authService: AuthService, carritoService: CarritoService, productoService: ProductoService, router: Router) {
    super(authService, carritoService, productoService, router);
  }
}
