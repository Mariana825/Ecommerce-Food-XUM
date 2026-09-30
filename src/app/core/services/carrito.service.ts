import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemCarrito } from '../interfaces/carrito.interface';
import { Producto } from '../interfaces/producto.interface';

const COSTO_ENVIO = 5;

/**
 * Carrito de compras real y único para TODA la aplicación.
 * Las 5 interfaces (desktop, mobile, smartwatch, tablet, car) leen
 * y escriben sobre este mismo servicio, así que agregar un platillo
 * en una vista se refleja de inmediato en cualquier otra.
 * Se persiste en localStorage para sobrevivir recargas de página.
 */
@Injectable({ providedIn: 'root' })
export class CarritoService {

  private readonly claveCarrito = 'xum_carrito';
  private readonly itemsSubject = new BehaviorSubject<ItemCarrito[]>(this.leerCarritoGuardado());

  readonly items$: Observable<ItemCarrito[]> = this.itemsSubject.asObservable();

  readonly cantidadTotal$: Observable<number> = this.items$.pipe(
    map((items: ItemCarrito[]) => items.reduce((suma: number, item: ItemCarrito) => suma + item.cantidad, 0))
  );

  readonly subtotal$: Observable<number> = this.items$.pipe(
    map((items: ItemCarrito[]) => items.reduce((suma: number, item: ItemCarrito) => suma + item.producto.precio * item.cantidad, 0))
  );

  readonly costoEnvio$: Observable<number> = this.items$.pipe(
    map((items: ItemCarrito[]) => (items.length > 0 ? COSTO_ENVIO : 0))
  );

  readonly total$: Observable<number> = this.items$.pipe(
    map((items: ItemCarrito[]) => {
      const subtotal = items.reduce((suma: number, item: ItemCarrito) => suma + item.producto.precio * item.cantidad, 0);
      const envio = items.length > 0 ? COSTO_ENVIO : 0;
      return subtotal + envio;
    })
  );

  get itemsActuales(): ItemCarrito[] {
    return this.itemsSubject.value;
  }

  agregar(producto: Producto): void {
    const items = [...this.itemsSubject.value];
    const existente = items.find((item) => item.producto.id === producto.id);

    if (existente) {
      existente.cantidad += 1;
    } else {
      items.push({ producto, cantidad: 1 });
    }

    this.actualizar(items);
  }

  incrementar(idProducto: number): void {
    const items = this.itemsSubject.value.map((item) =>
      item.producto.id === idProducto ? { ...item, cantidad: item.cantidad + 1 } : item
    );
    this.actualizar(items);
  }

  decrementar(idProducto: number): void {
    const items = this.itemsSubject.value
      .map((item) => (item.producto.id === idProducto ? { ...item, cantidad: item.cantidad - 1 } : item))
      .filter((item) => item.cantidad > 0);
    this.actualizar(items);
  }

  quitar(idProducto: number): void {
    const items = this.itemsSubject.value.filter((item) => item.producto.id !== idProducto);
    this.actualizar(items);
  }

  vaciar(): void {
    this.actualizar([]);
  }

  private actualizar(items: ItemCarrito[]): void {
    this.itemsSubject.next(items);
    localStorage.setItem(this.claveCarrito, JSON.stringify(items));
  }

  private leerCarritoGuardado(): ItemCarrito[] {
    const datos = localStorage.getItem(this.claveCarrito);
    if (!datos) {
      return [];
    }
    try {
      return JSON.parse(datos) as ItemCarrito[];
    } catch {
      return [];
    }
  }
}
