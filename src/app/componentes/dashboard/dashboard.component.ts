import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
constructor(private router: Router){

}

  cerrarSesion() {
    // Lógica para limpiar la sesión del usuario
    localStorage.removeItem('usuario'); // Elimina datos del usuario
    sessionStorage.clear(); // Limpia cualquier dato en la sesión

    // Redirige al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }

}
