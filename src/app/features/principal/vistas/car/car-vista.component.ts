import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemCarrito } from '../../../../core/interfaces/carrito.interface';
import { Producto } from '../../../../core/interfaces/producto.interface';
import { AuthService } from '../../../../core/services/auth.service';
import { CarritoService } from '../../../../core/services/carrito.service';
import { ProductoService } from '../../../../core/services/producto.service';

/**
 * Vista 5: pantalla de auto. Figma no incluía este diseño (el
 * requerimiento pide completarlo), así que se adaptó siguiendo la
 * misma identidad visual: botones grandes y poco texto, pensados
 * para tocarse rápido y sin distraer al conductor.
 */
@Component({
  selector: 'app-vista-car',
  templateUrl: './car-vista.component.html',
  styleUrls: ['./car-vista.component.css']
})
export class CarVistaComponent implements OnInit {

  tipoMenu: string = 'almuerzo';
  productos: Producto[] = [];
  cargando: boolean = false;

  items$!: Observable<ItemCarrito[]>;
  total$!: Observable<number>;
  cantidadTotal$!: Observable<number>;

  constructor(
    private authService: AuthService,
    private carritoService: CarritoService,
    private productoService: ProductoService,
    private router: Router
  ) {
    this.items$ = this.carritoService.items$;
    this.total$ = this.carritoService.total$;
    this.cantidadTotal$ = this.carritoService.cantidadTotal$;
  }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cambiarTipoMenu(tipo: string): void {
    this.tipoMenu = tipo;
    this.cargarProductos();
  }

  private cargarProductos(): void {
    this.cargando = true;
    this.productoService.obtenerProductos(3).subscribe({
      next: (productos) => { this.productos = productos; this.cargando = false; },
      error: () => { this.cargando = false; }
    });
  }

  agregarAlCarrito(producto: Producto): void {
    this.carritoService.agregar(producto);
  }

  ordenar(): void {
    if (this.carritoService.itemsActuales.length === 0) {
      return;
    }
    alert('Pedido enviado (demo). Recógelo al llegar a tu destino 🚗');
    this.carritoService.vaciar();
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion();
    this.carritoService.vaciar();
    this.router.navigate(['/login']);
  }
}
