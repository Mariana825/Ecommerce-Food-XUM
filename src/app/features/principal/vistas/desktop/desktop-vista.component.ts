import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../../../core/interfaces/usuario.interface';
import { Producto } from '../../../../core/interfaces/producto.interface';
import { AuthService } from '../../../../core/services/auth.service';
import { CarritoService } from '../../../../core/services/carrito.service';
import { ProductoService } from '../../../../core/services/producto.service';
import { SeccionEncabezado } from '../../../../shared/components/encabezado/encabezado.component';
interface TextosMenu { titulo: string; subtitulo: string; }

const TEXTOS_MENU: Record<string, TextosMenu> = {
  desayuno: { titulo: 'Nuestro Menú Desayuno', subtitulo: 'Empieza el día con nuestras opciones frescas y energéticas.' },
  almuerzo: { titulo: 'Nuestro Menú Almuerzo', subtitulo: 'Platillos completos para la comida principal.' },
  cena:     { titulo: 'Nuestro Menú Cena', subtitulo: 'Cierra el día con nuestras especialidades de la noche.' }
};

/**
 * Vista 1 (por defecto tras el login): interfaz completa de escritorio.
 * Conserva header y footer, y muestra internamente Inicio / Menú / Carrito
 * según lo que el usuario elija en el encabezado (sin usar el Router,
 * para no perder la vista de dispositivo activa).
 */
@Component({
  selector: 'app-vista-desktop',
  templateUrl: './desktop-vista.component.html',
  styleUrls: ['./desktop-vista.component.css']
})
export class DesktopVistaComponent implements OnInit {

  usuario: Usuario | null = null;
  pantalla: 'inicio' | 'menu' | 'carrito' = 'inicio';
  tipoMenu: string = 'almuerzo';

  productos: Producto[] = [];
  cargando: boolean = false;
  error: string = '';

  constructor(
    private authService: AuthService,
    private carritoService: CarritoService,
    protected productoService: ProductoService,
    protected router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuarioActual();
  }

  get tituloMenu(): string { return (TEXTOS_MENU[this.tipoMenu] ?? TEXTOS_MENU['almuerzo']).titulo; }
  get subtituloMenu(): string { return (TEXTOS_MENU[this.tipoMenu] ?? TEXTOS_MENU['almuerzo']).subtitulo; }

  alSeleccionarEncabezado(seccion: SeccionEncabezado): void {
    if (seccion === 'inicio' || seccion === 'carrito') {
      this.pantalla = seccion;
      return;
    }
    this.tipoMenu = seccion;
    this.pantalla = 'menu';
    this.cargarProductos();
  }

  irAMenu(tipo: string = 'almuerzo'): void {
    this.tipoMenu = tipo;
    this.pantalla = 'menu';
    this.cargarProductos();
  }

  private cargarProductos(): void {
    this.cargando = true;
    this.error = '';
    this.productoService.obtenerProductos(4).subscribe({
      next: (productos) => { this.productos = productos; this.cargando = false; },
      error: () => { this.error = 'No se pudieron cargar los platillos. Intenta de nuevo más tarde.'; this.cargando = false; }
    });
  }

  agregarAlCarrito(producto: Producto): void {
    this.carritoService.agregar(producto);
  }

  alCerrarSesion(): void {
    this.router.navigate(['/login']);
  }
}
