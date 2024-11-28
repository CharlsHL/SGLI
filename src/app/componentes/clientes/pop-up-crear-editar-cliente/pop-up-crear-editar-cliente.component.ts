import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from '../../../servicios/cliente.service';
import { CentroService } from '../../../servicios/centro.service';
import { Cliente } from '../../../modelos/cliente';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pop-up-crear-editar-cliente',
  standalone: true,
  imports: [FormsModule ,CommonModule,ReactiveFormsModule ],
  templateUrl: './pop-up-crear-editar-cliente.component.html',
  styleUrl: './pop-up-crear-editar-cliente.component.css'
})
export class PopUpCrearEditarClienteComponent   implements OnInit{

    @Input() cliente: any;  // Datos del cliente
    @Input() modo: string = '';  // Modo: 'agregar' o 'editar'
    @Output() cerrar = new EventEmitter<void>(); // Evento para cerrar el modal
    public list : any;
    usuarioData!: any; // Usar operador de aserción
    guidCentro!: string; // Usar operador de aserción
    public centro!: any;
    public usuarioCuenta: any;
    clienteForm: FormGroup = new FormGroup({});  // Inicialización vacía
  
    constructor(public activeModal: NgbActiveModal,
                public apiCliente : ClienteService,
                public apiCentro : CentroService,
                private fb: FormBuilder
    ) {}
  
    ngOnInit(): void {
      this.cargarFormulario(); 
   }
  
    // Método para cerrar el modal utilizando NgbActiveModal
    cerrarModal() {
      this.activeModal.close('success');
    }
  
    cargarFormulario(){
      // Inicializar el formulario
      this.clienteForm = this.fb.group({
        nombre: [this.cliente?.nombre || '', Validators.required],
        apellido: [this.cliente?.apellido || '', Validators.required],
        tipoDocumento: [this.cliente?.tipoDocumento || '', Validators.required],
        numeroDocumento: [this.cliente?.numeroDocumento || '', Validators.required],
        telefono: [this.cliente?.telefono || '', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
        email: [this.cliente?.email || '', [Validators.required, Validators.email]],
        direccion: [this.cliente?.direccion || '', Validators.required],
        estado: [this.cliente?.estado || '', Validators.required],
      });
    }

    // Método para guardar los cambios (simulado)
    guardarCambios() {
      if(this.modo=== 'editar'){
        if (this.clienteForm.invalid) {
          this.clienteForm.markAllAsTouched(); // Marcar todos los campos como tocados
          return;
        }
        // Lógica para guardar el formulario (enviar los datos al servidor, etc.)
        this.editCliente();
      }else{
        if (this.clienteForm.invalid) {
          this.clienteForm.markAllAsTouched(); // Marcar todos los campos como tocados
          return;
        }
       this.addEmpleado();
      }
      this.cerrarModal();  // Cerrar el modal después de guardar
    }

    
    addEmpleado() {
      const storedData = localStorage.getItem('usuario');
  
      // Verificar si hay datos en el localStorage
      if (storedData) {
        // Deserializar los datos
        this.usuarioData = JSON.parse(storedData);
      }
        // Obtener los valores del formulario
      const clienteData = this.clienteForm.value;
      // Aquí estamos creando el objeto empleado con los valores que llegan del formulario
      const cliente: Cliente = {
        guidCentro:  this.usuarioData.guidCentro,  // Puedes generar o asignar un GUID único
        razonSocial: clienteData.nombre,  // Se asigna el valor de "nombre" del formulario
        guid: clienteData.nombre,
        cuitCuil:  clienteData.nombre,
        direccion: clienteData.nombre,
        pais: clienteData.nombre,
        provincia : clienteData.nombre,
        ciudad : clienteData.nombre,
        telefono: clienteData.nombre,
        email: clienteData.nombre,
        estado: clienteData.nombre,
      };
       // Llamamos al servicio API para agregar el empleado
      this.apiCliente.add(cliente).subscribe(respuesta => {
        // Si la respuesta tiene éxito, cerramos el modal y mostramos un mensaje
        if (respuesta.exito === 1) {
          this.cerrarModal(); // Cierra el modal
        } else {
          this.cerrarModal();;  // Cierra el modal
        }
      });
    }
  
    editCliente(){
      const storedData = localStorage.getItem('usuario');
  
      // Verificar si hay datos en el localStorage
      if (storedData) {
        // Deserializar los datos
        this.usuarioData = JSON.parse(storedData);
      }
      const clienteData = this.clienteForm.value;
      // Aquí estamos creando el objeto empleado con los valores que llegan del formulario
      const cliente: Cliente = {
        guidCentro:  this.usuarioData.guidCentro,  // Puedes generar o asignar un GUID único
        razonSocial: clienteData.nombre,  // Se asigna el valor de "nombre" del formulario
        guid: clienteData.nombre,
        cuitCuil:  clienteData.nombre,
        direccion: clienteData.nombre,
        pais: clienteData.nombre,
        provincia : clienteData.nombre,
        ciudad : clienteData.nombre,
        telefono: clienteData.nombre,
        email: clienteData.nombre,
        estado: clienteData.nombre,
      };
       // Llamamos al servicio API para agregar el empleado
      this.apiCliente.edit(cliente).subscribe(respuesta => {
        // Si la respuesta tiene éxito, cerramos el modal y mostramos un mensaje
        if (respuesta.exito === 1) {
          this.cerrarModal(); // Cierra el modal
        } else {
          this.cerrarModal();;  // Cierra el modal
        }
      });
    }
}