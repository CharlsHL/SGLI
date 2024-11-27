import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RolService } from '../../../servicios/rol.service';
import { CommonModule } from '@angular/common';
import { Empleado } from '../../../modelos/empleado';
import { EmpleadoServiceService } from '../../../servicios/empleado-service.service';
import { CentroService } from '../../../servicios/centro.service';
import { UsuariosService } from '../../../servicios/usuarios.service';
@Component({
  selector: 'app-pop-up-crear-editar-empleado',
  standalone: true,
  imports: [FormsModule ,CommonModule,ReactiveFormsModule],
  templateUrl: './pop-up-crear-editar-empleado.component.html',
  styleUrl: './pop-up-crear-editar-empleado.component.css'
})
export class PopUpCrearEditarEmpleadoComponent implements OnInit{
  @Input() empleado: any;  // Datos del empleado
  @Input() modo: string = '';  // Modo: 'agregar' o 'editar'
  @Output() cerrar = new EventEmitter<void>(); // Evento para cerrar el modal
  public list : any;
  usuarioData!: any; // Usar operador de aserción
  guidCentro!: string; // Usar operador de aserción
  public centro!: any;
  public usuarioCuenta: any;
  empleadoForm: FormGroup = new FormGroup({}); // Inicialización vacía

  constructor(public activeModal: NgbActiveModal,
              public apiRol :  RolService,
              public apiEmpleado : EmpleadoServiceService,
              public apiCentro : CentroService,
              public apiUsuario : UsuariosService,
              private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getRoles(); 
    this.cargarFormulario();     
    if(this.modo === 'editar'){     
      this.apiUsuario.getUsuario(this.empleado.guid).subscribe({
        next: (respuesta) => {
          this.usuarioCuenta = respuesta.datos.usuario;
          this.empleado.contrasena = this.usuarioCuenta.contraseña;
          this.empleado.usuario = this.usuarioCuenta.usuario;
          this.cargarFormulario();
        },
        error: (err) => {
          console.error('Error al cargar:', err);
        }
      });
    }
 }

  // Método para cerrar el modal utilizando NgbActiveModal
  cerrarModal() {
    this.activeModal.close('success');
  }

  cargarFormulario(){
    // Inicializar el formulario
    this.empleadoForm = this.fb.group({
      nombre: [this.empleado?.nombre || '', Validators.required],
      apellido: [this.empleado?.apellido || '', Validators.required],
      tipoDocumento: [this.empleado?.tipoDocumento || '', Validators.required],
      numeroDocumento: [this.empleado?.numeroDocumento || '', Validators.required],
      telefono: [this.empleado?.telefono || '', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      email: [this.empleado?.email || '', [Validators.required, Validators.email]],
      direccion: [this.empleado?.direccion || '', Validators.required],
      estado: [this.empleado?.estado || '', Validators.required],
      guidRol: [this.empleado?.guidRol || '', Validators.required],
      usuario: [this.empleado?.usuario || '', Validators.required],
      contrasena: [this.empleado?.contrasena || '', Validators.required]
    });
  }
  // Método para guardar los cambios (simulado)
  guardarCambios() {
    if(this.modo=== 'editar'){
      if (this.empleadoForm.invalid) {
        this.empleadoForm.markAllAsTouched(); // Marcar todos los campos como tocados
        return;
      }
      // Lógica para guardar el formulario (enviar los datos al servidor, etc.)
      this.editEmpleado();
    }else{
      if (this.empleadoForm.invalid) {
        this.empleadoForm.markAllAsTouched(); // Marcar todos los campos como tocados
        return;
      }
     this.addEmpleado();
    }
    this.cerrarModal();  // Cerrar el modal después de guardar
  }

  getRoles(): void {
    // Obtener los datos del localStorage
    const storedData = localStorage.getItem('usuario');

    // Verificar si hay datos en el localStorage
    if (storedData) {
      // Deserializar los datos
      this.usuarioData = JSON.parse(storedData);
    }

    this.apiRol.getRoles(this.usuarioData.guidCentro).subscribe({
      next: (respuesta) => {
        this.list = respuesta.datos.$values;
      },
      error: (err) => {
        console.error('Error al cargar los roles:', err);
      }
    });
  }
  
  addEmpleado() {
    const storedData = localStorage.getItem('usuario');

    // Verificar si hay datos en el localStorage
    if (storedData) {
      // Deserializar los datos
      this.usuarioData = JSON.parse(storedData);
    }
      // Obtener los valores del formulario
    const empleadoData = this.empleadoForm.value;
    // Aquí estamos creando el objeto empleado con los valores que llegan del formulario
    const empleado: Empleado = {
      guid:  this.usuarioData.guidCentro,  // Puedes generar o asignar un GUID único
      nombre: empleadoData.nombre,  // Se asigna el valor de "nombre" del formulario
      apellido: empleadoData.apellido,  // Se asigna el valor de "apellido" del formulario
      tipoDocumento: empleadoData.tipoDocumento,  // Se asigna el valor de "tipoDocumento" del formulario
      documento: empleadoData.numeroDocumento,  // Asignamos "numeroDocumento" al campo "documento"
      telefono: empleadoData.telefono,  // Asignamos el "telefono" del formulario
      email: empleadoData.email,  // Asignamos el "email" del formulario
      direccion: empleadoData.direccion,  // Asignamos la "direccion" del formulario
      estado: 'A',  // Asignamos el "estado" del formulario
      guidRol: empleadoData.guidRol,  // Asignamos el rol seleccionado
      guidCentro: this.usuarioData.guidCentro,  // Asignamos el centro del formulario
      usuario: empleadoData.usuario,  // Asignamos el "usuario" del formulario
      contraseña: empleadoData.contrasena  // Asignamos la "contraseña" del formulario
    };
     // Llamamos al servicio API para agregar el empleado
    this.apiEmpleado.add(empleado).subscribe(respuesta => {
      // Si la respuesta tiene éxito, cerramos el modal y mostramos un mensaje
      if (respuesta.exito === 1) {
        this.cerrarModal(); // Cierra el modal
      } else {
        this.cerrarModal();;  // Cierra el modal
      }
    });
  }

  editEmpleado(){
    const storedData = localStorage.getItem('usuario');

    // Verificar si hay datos en el localStorage
    if (storedData) {
      // Deserializar los datos
      this.usuarioData = JSON.parse(storedData);
    }
    const empleadoData = this.empleadoForm.value;
    // Aquí estamos creando el objeto empleado con los valores que llegan del formulario
    const empleado: Empleado = {
      guid:  this.usuarioData.guidCentro,  // Puedes generar o asignar un GUID único
      nombre: empleadoData.nombre,  // Se asigna el valor de "nombre" del formulario
      apellido: empleadoData.apellido,  // Se asigna el valor de "apellido" del formulario
      tipoDocumento: empleadoData.tipoDocumento,  // Se asigna el valor de "tipoDocumento" del formulario
      documento: empleadoData.numeroDocumento,  // Asignamos "numeroDocumento" al campo "documento"
      telefono: empleadoData.telefono,  // Asignamos el "telefono" del formulario
      email: empleadoData.email,  // Asignamos el "email" del formulario
      direccion: empleadoData.direccion,  // Asignamos la "direccion" del formulario
      estado: 'A',  // Asignamos el "estado" del formulario
      guidRol: empleadoData.guidRol,  // Asignamos el rol seleccionado
      guidCentro: this.usuarioData.guidCentro,  // Asignamos el centro del formulario
      usuario: empleadoData.usuario,  // Asignamos el "usuario" del formulario
      contraseña: empleadoData.contrasena  // Asignamos la "contraseña" del formulario
    };
     // Llamamos al servicio API para agregar el empleado
    this.apiEmpleado.edit(empleado).subscribe(respuesta => {
      // Si la respuesta tiene éxito, cerramos el modal y mostramos un mensaje
      if (respuesta.exito === 1) {
        this.cerrarModal(); // Cierra el modal
      } else {
        this.cerrarModal();;  // Cierra el modal
      }
    });
  }
}
