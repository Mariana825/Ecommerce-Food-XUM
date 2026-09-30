import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Producto } from '../../../../core/interfaces/producto.interface';
import { AuthService } from '../../../../core/services/auth.service';
import { CarritoService } from '../../../../core/services/carrito.service';
import { ProductoService } from '../../../../core/services/producto.service';

type PantallaReloj = 'inicio' | 'menu' | 'confirmar' | 'carrito';

/**
 * Vista 3: smartwatch. El espacio es demasiado pequeño para mostrar
 * todo a la vez (igual que en el Figma de referencia), así que se
 * arma una mini-navegación propia entre 4 pantallas: inicio, elegir
 * platillo, confirmar pedido y ver el carrito — sin perder ninguna
 * funcionalidad respecto a las demás vistas.
 */
@Component({
  selector: 'app-vista-smartwatch',
  templateUrl: './smartwatch-vista.component.html',
  styleUrls: ['./smartwatch-vista.component.css']
})
export class SmartwatchVistaComponent implements OnInit {

  pantalla: PantallaReloj = 'inicio';
  tipoMenu: string = 'almuerzo';

  productos: Producto[] = [];
  cargando: boolean = false;
  platilloSeleccionado: Producto | null = null;

  cantidadTotal$!: Observable<number>;
  total$!: Observable<number>;

  constructor(
    private authService: AuthService,
    private carritoService: CarritoService,
    private productoService: ProductoService,
    private router: Router
  ) {
    this.cantidadTotal$ = this.carritoService.cantidadTotal$;
    this.total$ = this.carritoService.total$;
  }

  ngOnInit(): void {
    this.cargarProductos();
  }

  private cargarProductos(): void {
    this.cargando = true;
    this.productoService.obtenerProductos(3).subscribe({
      next: (productos) => { this.productos = productos; this.cargando = false; },
      error: () => { this.cargando = false; }
    });
  }

  irA(pantalla: PantallaReloj): void {
    this.pantalla = pantalla;
  }

  elegirPlatillo(producto: Producto): void {
    this.platilloSeleccionado = producto;
    this.pantalla = 'confirmar';
  }

  confirmarPedido(): void {
    if (this.platilloSeleccionado) {
      this.carritoService.agregar(this.platilloSeleccionado);
    }
    this.pantalla = 'inicio';
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion();
    this.carritoService.vaciar();
    this.router.navigate(['/login']);
  }
}
