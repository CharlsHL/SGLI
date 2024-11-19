import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})

export class ProveedoresComponent {
  proveedores = [
    { nombre: 'Juan Pérez', email: 'juan@example.com' },
    { nombre: 'Ana López', email: 'ana@example.com' },
    { nombre: 'Carlos García', email: 'carlos@example.com' }
  ];

  agregarProveedores() {
    // Lógica para agregar un usuario, puedes abrir un modal o redirigir a un formulario
    console.log('Agregar nuevo usuario');
  }

  verDetalles(usuario: any) {
    // Lógica para ver los detalles de un usuario
    console.log('Ver detalles del usuario', usuario);
  }

  editarProveedores(usuario: any) {
    // Lógica para editar el usuario
    console.log('Editar usuario', usuario);
  }

  eliminarProveedores(usuario: any) {

  }
}
