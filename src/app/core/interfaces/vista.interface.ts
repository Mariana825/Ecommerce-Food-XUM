/**
 * Las 5 interfaces/dispositivos que puede mostrar la aplicación
 * después del login. Un único punto de verdad para todo el sitio.
 */
export type DeviceView = 'desktop' | 'mobile' | 'smartwatch' | 'tablet' | 'car';

/** Metadatos de cada vista, usados por el selector del footer. */
export interface OpcionVista {
  id: DeviceView;
  etiqueta: string;
}
