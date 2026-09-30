import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DeviceView } from '../interfaces/vista.interface';

/**
 * Fuente única de verdad de qué interfaz (de las 5) está activa.
 * Es un servicio singleton (providedIn: 'root'), así que cambiar de
 * vista NUNCA destruye ni reinicia AuthService ni CarritoService:
 * la sesión y el carrito se conservan siempre entre vistas.
 */
@Injectable({ providedIn: 'root' })
export class VistaService {

  private readonly claveVista = 'xum_vista_actual';
  private readonly vistaSubject = new BehaviorSubject<DeviceView>(this.leerVistaGuardada());

  readonly vista$: Observable<DeviceView> = this.vistaSubject.asObservable();

  get vistaActual(): DeviceView {
    return this.vistaSubject.value;
  }

  cambiarVista(vista: DeviceView): void {
    this.vistaSubject.next(vista);
    sessionStorage.setItem(this.claveVista, vista);
  }

  /** Al iniciar sesión, la vista siempre vuelve a "desktop" (punto 1 del requerimiento). */
  reiniciarADesktop(): void {
    this.cambiarVista('desktop');
  }

  private leerVistaGuardada(): DeviceView {
    const guardada = sessionStorage.getItem(this.claveVista) as DeviceView | null;
    const validas: DeviceView[] = ['desktop', 'mobile', 'smartwatch', 'tablet', 'car'];
    return guardada && validas.includes(guardada) ? guardada : 'desktop';
  }
}
