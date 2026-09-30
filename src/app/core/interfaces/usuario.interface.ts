/**
 * usuario ya autenticado (sin datos sensibles).
 * lo q se guarda en la sesión (localStorage).
 */
export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
}

/**
 * datos desde el formulario de login.
 * 
 */
export interface Credenciales {
  correo: string;
  contrasena: string;
}

/**
 * registro interno "simulando" una bdi
 */
export interface UsuarioRegistrado extends Usuario {
  contrasena: string;
}

/**
 * Forma tipada de la respuesta del "login". Sirve para validar
 * 
 */
export interface RespuestaLogin {
  exito: boolean;
  usuario?: Usuario;
  mensaje?: string;
}
