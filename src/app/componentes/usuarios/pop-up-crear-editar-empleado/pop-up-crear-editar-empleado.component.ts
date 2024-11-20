import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-pop-up-crear-editar-empleado',
  standalone: true,
  imports: [FormsModule ],
  templateUrl: './pop-up-crear-editar-empleado.component.html',
  styleUrl: './pop-up-crear-editar-empleado.component.css'
})
export class PopUpCrearEditarEmpleadoComponent {
  @Input() empleado: any;  // Datos del empleado
  @Input() modo: string = '';  // Modo: 'agregar' o 'editar'
  @Output() cerrar = new EventEmitter<void>(); // Evento para cerrar el modal

  constructor(public activeModal: NgbActiveModal) {}

  // Método para cerrar el modal utilizando NgbActiveModal
  cerrarModal() {
    this.activeModal.close();  // Cerramos el modal
  }

  // Método para guardar los cambios (simulado)
  guardarCambios() {
    console.log('Empleado guardado:', this.empleado);
    this.cerrarModal();  // Cerrar el modal después de guardar
  }
}
