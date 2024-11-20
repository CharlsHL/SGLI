import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadoServiceService } from '../../servicios/empleado-service.service';
import { PopupEliminarComponent } from '../genericos/popup-eliminar/popup-eliminar.component';
import { PopUpCrearEditarEmpleadoComponent } from './pop-up-crear-editar-empleado/pop-up-crear-editar-empleado.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  constructor(    
    private apiEmpleado: EmpleadoServiceService,
    private modalService: NgbModal
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

  modalRef.componentInstance.empleado = { ...usuario };  // Datos del usuario a editar
  modalRef.componentInstance.modo = 'editar';  // Modo para editar

  modalRef.result.then(
    (result) => {
      console.log('Modal cerrado con resultado:', result);
    },
    (error) => {
      console.log('Error al cerrar modal:', error);
    }
  );
}

  obtenerUsuarios(){
    this.apiEmpleado.getEmpleados().subscribe(Respuesta => {
      if(Respuesta.exito != 0)
       this.usuarios = Respuesta.datos.$values;
   })  
  }

  verDetalles(usuario: any) {
    // Lógica para ver los detalles de un usuario
    console.log('Ver detalles del usuario', usuario);
  }



  eliminarUsuario(usuario: any) {
    // Lógica para eliminar el usuario
    console.log('Eliminar usuario', usuario);
    this.usuarios = this.usuarios.filter(u => u !== usuario);
  }
}
