import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadoServiceService } from '../../servicios/empleado-service.service';
import { PopupEliminarComponent } from '../genericos/popup-eliminar/popup-eliminar.component';
import { PopUpCrearEditarEmpleadoComponent } from './pop-up-crear-editar-empleado/pop-up-crear-editar-empleado.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from '../../servicios/usuarios.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule,FormsModule ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})

export class UsuariosComponent {
  readonly width: string = '525px';
  readonly higt: string = '600px'
  usuarioData!: any; 
  usuarioCuenta!: any;
  paginaActual: number = 1;
  usuariosPorPagina: number = 5;
  usuariosPaginados: any[] = [];
  totalPaginas: number = 0;  // Nueva propiedad para almacenar el total de páginas
  apellidoFiltro: string = ''; // Campo para el filtro de apellido

  constructor(    
    private apiEmpleado: EmpleadoServiceService,
    private modalService: NgbModal,
    private apiUsuario: UsuariosService
  ){}


  usuarios = [
    { nombre: 'Juan Pérez', email: 'juan@example.com' },
    { nombre: 'Ana López', email: 'ana@example.com' },
    { nombre: 'Carlos García', email: 'carlos@example.com' }
  ];

  ngOnInit(): void {
    this.obtenerUsuarios();  
 }

agregarUsuario() {
  const modalRef = this.modalService.open(PopUpCrearEditarEmpleadoComponent, {
    size: 'lg',          // Ajusta el tamaño del modal si es necesario
    backdrop: false,      // Permite que el fondo sea interactivo
    keyboard: true       // Permite que el modal se cierre con la tecla ESC
  });

  modalRef.componentInstance.empleado = { nombre: '', puesto: '' };  // Datos vacíos para agregar
  modalRef.componentInstance.modo = 'agregar';  // Modo para agregar

  // Escuchar el resultado del modal
  modalRef.result
    .then(
      (result) => {
        if (result === 'success') {  // Opcionalmente, puedes manejar un valor específico
          console.log('Modal cerrado con éxito:', result);
          this.obtenerUsuarios(); // Actualizar la lista
          window.location.reload();
        }
      },
      (reason) => {
        console.log('Modal cerrado sin acción:', reason);
        window.location.reload();
      }
    )
    .catch((error) => {
      console.error('Error al cerrar el modal:', error);
    });
}

editarUsuario(usuario: any) {
  const modalRef = this.modalService.open(PopUpCrearEditarEmpleadoComponent, {
    size: 'lg',
    backdrop: false,      // Permite que el fondo sea interactivo
    keyboard: true       // Permite que el modal se cierre con la tecla ESC
  });
  this.apiUsuario.getUsuario(usuario.guid).subscribe({
    next: (respuesta) => {
      this.usuarioCuenta = respuesta.datos.usuario;
      usuario.contrasena = this.usuarioCuenta.contraseña;
      usuario.usuario = this.usuarioCuenta.usuario;
    },
    error: (err) => {
      console.error('Error al cargar los roles:', err);
    }
  });
  modalRef.componentInstance.empleado = { ...usuario };  // Datos del usuario a editar
  modalRef.componentInstance.modo = 'editar';  // Modo para editar

  modalRef.result.then(
    (result) => {
      if (result === 'success') {  // Opcionalmente, puedes manejar un valor específico

        this.obtenerUsuarios(); // Actualizar la lista
        window.location.reload();
      }
    },
    (reason) => {    }
  )
  .catch((error) => {
    console.error('Error al cerrar el modal:', error);
  });
}

eliminarUsuario(usuario: any) {
  debugger;
  const modalRef = this.modalService.open(PopupEliminarComponent, {
    size: 'md',
    backdrop: false,      // Permite que el fondo sea interactivo
    keyboard: true   
  });

  modalRef.componentInstance.mensaje = `¿Está seguro de que desea eliminar al usuario ${usuario.nombre}?`;

  modalRef.result.then(
    (result) => {
      if (result) {
        // Confirmación aceptada, proceder a eliminar
        this.apiEmpleado.deleteEmpleado(usuario.guid).subscribe({
          next: () => {
            console.log('Usuario eliminado con éxito');
            this.usuarios = this.usuarios.filter((u) => u !== usuario);
          },
          error: (err) => {
            console.error('Error al eliminar usuario:', err);
          }
        });
      }
    },
    (reason) => {
      // El usuario canceló la acción
      console.log('Eliminación cancelada:', reason);
    }
  );
}

obtenerUsuarios() {
    const storedData = localStorage.getItem('usuario');
    if (storedData) {
      this.usuarioData = JSON.parse(storedData);
    }

    this.apiEmpleado.getEmpleados(this.usuarioData.guidCentro).subscribe(Respuesta => {
      if (Respuesta.exito != 0) {

        this.usuarios = Respuesta.datos.$values;
        this.totalPaginas = Math.ceil(this.usuarios.length / this.usuariosPorPagina); // Calcula el total de páginas
        this.actualizarPaginacion();
      }
    });
}

actualizarPaginacion(): void {
  const inicio = (this.paginaActual - 1) * this.usuariosPorPagina;
  const fin = inicio + this.usuariosPorPagina;
  this.usuariosPaginados = this.usuarios.slice(inicio, fin);
}

paginacionAnterior(): void {
  if (this.paginaActual > 1) {
    this.paginaActual--;
    this.actualizarPaginacion();
  }
}

  paginacionSiguiente(): void {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      this.actualizarPaginacion();
    }
  }
    // Función para filtrar los usuarios por apellido
  filtrarUsuarios(): void {
    if (this.apellidoFiltro) {
      // Filtra usuarios que contengan el apellido en el nombre (puedes ajustarlo según cómo quieras que funcione el filtro)
      this.usuarios = this.usuarios.filter(usuario => 
        usuario.nombre.toLowerCase().includes(this.apellidoFiltro.toLowerCase())
      );
    } else {
      // Si no hay filtro, obtenemos todos los usuarios nuevamente
      this.obtenerUsuarios();
    }
    this.totalPaginas = Math.ceil(this.usuarios.length / this.usuariosPorPagina);
    this.actualizarPaginacion();
  }
}
