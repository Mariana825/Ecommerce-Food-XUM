import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../../../core/interfaces/usuario.interface';
import { Producto } from '../../../../core/interfaces/producto.interface';
import { AuthService } from '../../../../core/services/auth.service';
import { CarritoService } from '../../../../core/services/carrito.service';
import { ProductoService } from '../../../../core/services/producto.service';

type PantallaMovil = 'inicio' | 'menu' | 'carrito' | 'perfil';

interface TextosMenu { titulo: string; subtitulo: string; }

const TEXTOS_MENU: Record<string, TextosMenu> = {
  desayuno: { titulo: 'Menú Desayuno', subtitulo: 'Fresco y energético.' },
  almuerzo: { titulo: 'Daily Menu', subtitulo: 'Gourmet plates prepared fresh every single day.' },
  cena:     { titulo: 'Menú Cena', subtitulo: 'Nuestras especialidades de la noche.' }
};

/**
 * Vista 2: aplicación móvil. Se muestra SOLO el marco del teléfono
 * (sin ninguna página de escritorio alrededor). Reutiliza los mismos
 * servicios que el resto de la app (sesión, carrito, productos),
 * pero con su propia navegación interna por pestañas, igual que en
 * el diseño de Figma.
 */
@Component({
  selector: 'app-vista-mobile',
  templateUrl: './mobile-vista.component.html',
  styleUrls: ['./mobile-vista.component.css']
})
export class MobileVistaComponent implements OnInit {

  usuario: Usuario | null = null;
  pantalla: PantallaMovil = 'inicio';
  tipoMenu: string = 'almuerzo';

  productos: Producto[] = [];
  cargando: boolean = false;
  error: string = '';

  constructor(
    private authService: AuthService,
    private carritoService: CarritoService,
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuarioActual();
    this.cargarProductos();
  }

  get tituloMenu(): string { return (TEXTOS_MENU[this.tipoMenu] ?? TEXTOS_MENU['almuerzo']).titulo; }
  get subtituloMenu(): string { return (TEXTOS_MENU[this.tipoMenu] ?? TEXTOS_MENU['almuerzo']).subtitulo; }

  irA(pantalla: PantallaMovil): void {
    this.pantalla = pantalla;
    if (pantalla === 'menu' && this.productos.length === 0) {
      this.cargarProductos();
    }
  }

  cambiarTipoMenu(tipo: string): void {
    this.tipoMenu = tipo;
  }

  private cargarProductos(): void {
    this.cargando = true;
    this.error = '';
    this.productoService.obtenerProductos(4).subscribe({
      next: (productos) => { this.productos = productos; this.cargando = false; },
      error: () => { this.error = 'No se pudieron cargar los platillos.'; this.cargando = false; }
    });
  }

  agregarAlCarrito(producto: Producto): void {
    this.carritoService.agregar(producto);
  }

  cerrarSesion(): void {
    this.authService.cerrarSesion();
    this.carritoService.vaciar();
    this.router.navigate(['/login']);
  }
}
