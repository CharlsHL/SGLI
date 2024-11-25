import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { Console } from 'node:console';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  perfil!: any | null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Obtiene el perfil del usuario
    this.perfil = this.authService.getPerfil();
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  tienePermiso(opcion: string): boolean {
    const permisos: { [key: string]: string[] } = {
      ADMIN: ['usuarios', 'clientes', 'proveedores', 'compras', 'ventas','productos'],
      EMPLEADO: ['clientes', 'compras', 'ventas','productos'],
      CLIENTE: ['ventas'],
    };
    if (!this.perfil || !this.perfil.nombre) {
      console.error('El perfil no está definido o no tiene nombre');
      return false;
    }
  
    const nombrePerfil = this.perfil.nombre.toUpperCase(); // Normaliza el nombre
    const permisosUsuario = permisos[nombrePerfil];
  
    if (!permisosUsuario) {
      console.warn(`No hay permisos definidos para el perfil: ${nombrePerfil}`);
      return false;
    }
  
    return permisosUsuario.includes(opcion);
  }
}