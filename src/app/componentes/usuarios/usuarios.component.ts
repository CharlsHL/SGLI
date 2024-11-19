import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  usuarios = [
    { nombre: 'Juan Pérez', email: 'juan@example.com' },
    { nombre: 'Ana López', email: 'ana@example.com' },
    { nombre: 'Carlos García', email: 'carlos@example.com' }
  ];

  agregarUsuario() {
    // Lógica para agregar un usuario, puedes abrir un modal o redirigir a un formulario
    console.log('Agregar nuevo usuario');
  }

  verDetalles(usuario: any) {
    // Lógica para ver los detalles de un usuario
    console.log('Ver detalles del usuario', usuario);
  }

  editarUsuario(usuario: any) {
    // Lógica para editar el usuario
    console.log('Editar usuario', usuario);
  }

  eliminarUsuario(usuario: any) {
    // Lógica para eliminar el usuario
    console.log('Eliminar usuario', usuario);
    this.usuarios = this.usuarios.filter(u => u !== usuario);
  }
}
