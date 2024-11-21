import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup-eliminar',
  standalone: true,
  imports: [],
  templateUrl: './popup-eliminar.component.html',
  styleUrl: './popup-eliminar.component.css'
})
export class PopupEliminarComponent {
  @Input() title: string = 'Confirmación'; // Título del diálogo
  @Input() message: string = '¿Está seguro que desea realizar esta acción?'; // Mensaje del diálogo
  @Output() confirm: EventEmitter<void> = new EventEmitter(); // Evento de confirmación
  @Output() cancel: EventEmitter<void> = new EventEmitter(); // Evento de cancelación

  constructor(public activeModal: NgbActiveModal){  }

  cerrarModal() {
    this.activeModal.close();  // Cerramos el modal
  }
  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
    this.cerrarModal();
  }
}
