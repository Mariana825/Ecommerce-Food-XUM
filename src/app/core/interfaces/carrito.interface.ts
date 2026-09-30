import { Producto } from './producto.interface';

/** Un renglón del carrito: el producto más la cantidad elegida. */
export interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}
