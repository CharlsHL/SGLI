import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadoServiceService } from '../../servicios/empleado-service.service';
import { PopupEliminarComponent } from '../genericos/popup-eliminar/popup-eliminar.component';
import { PopUpCrearEditarEmpleadoComponent } from './pop-up-crear-editar-empleado/pop-up-crear-editar-empleado.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from '../../servicios/usuarios.service';
@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})

export class UsuariosComponent {
  readonly width: string = '525px';
  readonly higt: string = '600px'
  usuarioData!: any; 
  usuarioCuenta!: any;
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

  modalRef.result.then(
    (result) => {
      
      console.log('Modal cerrado con resultado:', result);
      this.obtenerUsuarios();
    },
    (error) => {
      console.log('Error al cerrar modal:', error);
    }
  );
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
      this.obtenerUsuarios();
      console.log('Modal cerrado con resultado:', result);
    },
    (error) => {
      console.log('Error al cerrar modal:', error);
    }
  );
}

eliminarUsuario(usuario: any) {
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
  obtenerUsuarios(){
    // Obtener los datos del localStorage
    const storedData = localStorage.getItem('usuario');

    // Verificar si hay datos en el localStorage
    if (storedData) {
      // Deserializar los datos
      this.usuarioData = JSON.parse(storedData);
    }
    this.apiEmpleado.getEmpleados(this.usuarioData.guidCentro).subscribe(Respuesta => {
      if(Respuesta.exito != 0)
       this.usuarios = Respuesta.datos.$values;
   })  
  }

  verDetalles(usuario: any) {
    // Lógica para ver los detalles de un usuario
    console.log('Ver detalles del usuario', usuario);
  }
}
