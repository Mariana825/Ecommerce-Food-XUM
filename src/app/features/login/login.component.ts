import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Credenciales, RespuestaLogin } from '../../core/interfaces/usuario.interface';
import { AuthService } from '../../core/services/auth.service';
import { VistaService } from '../../core/services/vista.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formularioLogin: FormGroup;
  cargando: boolean = false;
  mensajeError: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private vistaService: VistaService,
    private router: Router
  ) {
    this.formularioLogin = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  get correo() {
    return this.formularioLogin.get('correo');
  }

  get contrasena() {
    return this.formularioLogin.get('contrasena');
  }

  iniciarSesion(): void {
    if (this.formularioLogin.invalid) {
      this.formularioLogin.markAllAsTouched();
      return;
    }

    // El valor del formulario se valida contra la interfaz Credenciales:
    // si algún campo cambiara de nombre o tipo, TypeScript marcaría error aquí.
    const credenciales: Credenciales = this.formularioLogin.value as Credenciales;

    this.cargando = true;
    this.mensajeError = '';

    this.authService.iniciarSesion(credenciales).subscribe({
      next: (respuesta: RespuestaLogin) => {
        this.cargando = false;
        if (respuesta.exito) {
          this.vistaService.reiniciarADesktop();
          this.router.navigate(['/app']);
        } else {
          this.mensajeError = respuesta.mensaje ?? 'No se pudo iniciar sesión.';
        }
      },
      error: () => {
        this.cargando = false;
        this.mensajeError = 'Ocurrió un error inesperado. Intenta de nuevo.';
      }
    });
  }
}
