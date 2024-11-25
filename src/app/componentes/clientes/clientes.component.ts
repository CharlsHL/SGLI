import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from '../../servicios/cliente.service';
import { PopUpCrearEditarClienteComponent } from './pop-up-crear-editar-cliente/pop-up-crear-editar-cliente.component';
import { Console } from 'console';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})

export class ClientesComponent {
  readonly width: string = '525px';
  readonly higt: string = '600px'
  usuarioData!: any; 
  constructor(    
    private apliCliente: ClienteService,
    private modalService: NgbModal,

  ){}
  clientes = [
    { razonSocial: 'Juan Pérez', email: 'juan@example.com' },
    { razonSocial: 'Ana López', email: 'ana@example.com' },
    { razonSocial: 'Carlos García', email: 'carlos@example.com' }
  ];
  ngOnInit(): void {
    this.obtenerClientes();  
 }
  agregarCliente() {
    const modalRef = this.modalService.open(PopUpCrearEditarClienteComponent, {
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
            this.obtenerClientes(); // Actualizar la lista
          }
        },
        (reason) => {
          console.log('Modal cerrado sin acción:', reason);
        }
      )
      .catch((error) => {
        console.error('Error al cerrar el modal:', error);
      });
  }

  obtenerClientes(){
        // Obtener los datos del localStorage
        const storedData = localStorage.getItem('usuario');

        // Verificar si hay datos en el localStorage
        if (storedData) {
          // Deserializar los datos
          this.usuarioData = JSON.parse(storedData);
        }
        this.apliCliente.getClientes(this.usuarioData.guidCentro).subscribe(Respuesta => {
          if(Respuesta.exito != 0){
             console.log(Respuesta.datos.$values);
             this.clientes = Respuesta.datos.$values;
          }

       }) 
  }

  editarCliente(usuario: any) {
    // Lógica para editar el usuario
    console.log('Editar usuario', usuario);
  }

  eliminarCliente(usuario: any) {

  }
}
