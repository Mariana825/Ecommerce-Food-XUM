import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import {
  Credenciales,
  RespuestaLogin,
  Usuario,
  UsuarioRegistrado
} from '../interfaces/usuario.interface';

/**
 * autenticación.
 * - permanece la sesión en localstorage, si el usuario recarga, cierra y vuelve a abrir el navegador, siga con la sesión
 *   iniciada hasta que presione 
 */
@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly CLAVE_SESION = 'xum_usuario_actual';

  private readonly usuariosRegistrados: UsuarioRegistrado[] = [
    { id: 1, nombre: 'Mariana', correo: 'mariana@xum.com', contrasena: '1234' },
    { id: 2, nombre: 'Administrador', correo: 'admin@xum.com', contrasena: 'admin123' }
  ];

  /**
   * se validan las credenciales recibidas (tipadas con la interfaz credenciales)
   * y devuelve una respuesta tipada con respuestalogin.
   */
  iniciarSesion(credenciales: Credenciales): Observable<RespuestaLogin> {
    return of(credenciales).pipe(
      delay(600), 
      map((cred: Credenciales): RespuestaLogin => {
        const encontrado = this.usuariosRegistrados.find(
          (u) => u.correo.toLowerCase() === cred.correo.toLowerCase() &&
                 u.contrasena === cred.contrasena
        );

        if (!encontrado) {
          return { exito: false, mensaje: 'Correo o contraseña incorrectos.' };
        }

        const usuario: Usuario = {
          id: encontrado.id,
          nombre: encontrado.nombre,
          correo: encontrado.correo
        };

        localStorage.setItem(this.CLAVE_SESION, JSON.stringify(usuario));
        return { exito: true, usuario };
      })
    );
  }

  /** Cierra la sesión actual (borra la persistencia). */
  cerrarSesion(): void {
    localStorage.removeItem(this.CLAVE_SESION);
  }

  /** true si hay una sesión guardada en localStorage. */
  estaAutenticado(): boolean {
    return this.obtenerUsuarioActual() !== null;
  }

  /** Devuelve el usuario persistido, o null si no hay sesión activa. */
  obtenerUsuarioActual(): Usuario | null {
    const datos = localStorage.getItem(this.CLAVE_SESION);
    if (!datos) {
      return null;
    }
    try {
      return JSON.parse(datos) as Usuario;
    } catch {
      return null;
    }
  }
}
