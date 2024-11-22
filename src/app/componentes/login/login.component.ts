import { Component } from '@angular/core';
import { LogInService } from '../../servicios/log-in.service';
import { CommonModule } from '@angular/common';
import { login } from '../../Infertaz/Login';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importar aquí
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
   // Datos del formulario
  // Si usas ngModel directamente, puedes usar una interfaz para los datos del formulario
  formLogin = {
    usuario: '',
    password: ''
  };
  isLoading = false;  // Controla si el spinner se muestra
  loginError = false; // Controla si se muestra el mensaje de error
  errorMessage = ''; // Para mostrar el mensaje de error
  constructor(
    private _loginServicio: LogInService,
    private router: Router,
    
  ) {}

  login() {
    // Inicia el spinner
    this.isLoading = true;
    this.loginError = false; // Resetea cualquier error previo
    this.errorMessage = ''; // Resetea el mensaje de error
  
    const usuario = this.formLogin.usuario;
    const clave = this.formLogin.password;
    const login: login = {
      usuario: usuario,
      contraseña: clave
    };
  
    this._loginServicio.getIniciarSesion(login).subscribe({
      next: (response) => {
        // Si la autenticación es exitosa
        if (response.exito != 0 && response.datos != null) {
          localStorage.setItem('TOKEN', JSON.stringify(response.token));
          localStorage.setItem('usuario', JSON.stringify(response.datos.usuario));
          localStorage.setItem('PERFIL', JSON.stringify(response.datos.usuario.guidEmpleadoNavigation.guidRolNavigation));
          this.isLoading = false;  // Detiene el spinner
          this.router.navigate(['dashboard/inicio']);
        } else {
          // Si la autenticación falla (por ejemplo, credenciales incorrectas)
          this.loginError = true;
          this.errorMessage = 'Credenciales incorrectas'; // Mensaje personalizado
          this.isLoading = false;  // Detiene el spinner
        }
      },
      error: (error) => {
        // Manejo de errores HTTP generales
        this.loginError = true;
        this.errorMessage = error.token; // Mensaje de error genérico
        this.isLoading = false;  // Detiene el spinner
      }
    });
  }
}