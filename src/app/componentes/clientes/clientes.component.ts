import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {
  clientes = [
    { nombre: 'Juan Pérez', email: 'juan@example.com' },
    { nombre: 'Ana López', email: 'ana@example.com' },
    { nombre: 'Carlos García', email: 'carlos@example.com' }
  ];

  agregarCliente() {
    // Lógica para agregar un usuario, puedes abrir un modal o redirigir a un formulario
    console.log('Agregar nuevo usuario');
  }

  verDetalles(usuario: any) {
    // Lógica para ver los detalles de un usuario
    console.log('Ver detalles del usuario', usuario);
  }

  editarCliente(usuario: any) {
    // Lógica para editar el usuario
    console.log('Editar usuario', usuario);
  }

  eliminarCliente(usuario: any) {

  }
}
