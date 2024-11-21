import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  imports: [FormsModule ,CommonModule],
  templateUrl: './pop-up-crear-editar-empleado.component.html',
  styleUrl: './pop-up-crear-editar-empleado.component.css'
})
export class PopUpCrearEditarEmpleadoComponent {
  @Input() empleado: any;  // Datos del empleado
  @Input() modo: string = '';  // Modo: 'agregar' o 'editar'
  @Output() cerrar = new EventEmitter<void>(); // Evento para cerrar el modal
  public list : any;
  usuarioData!: any; // Usar operador de aserción
  guidCentro!: string; // Usar operador de aserción
  public centro!: any;
  public usuarioCuenta: any;
  constructor(public activeModal: NgbActiveModal,
              public apiRol :  RolService,
              public apiEmpleado : EmpleadoServiceService,
              public apiCentro : CentroService,
              public apiUsuario : UsuariosService
  ) {}

  ngOnInit(): void {
    this.getRoles();  
    if(this.modo === 'editar'){
      this.apiUsuario.getUsuario(this.empleado.guid).subscribe({
        next: (respuesta) => {
          this.usuarioCuenta = respuesta.datos.usuario;
          this.empleado.contrasena = this.usuarioCuenta.contraseña;
          this.empleado.usuario = this.usuarioCuenta.usuario;
        },
        error: (err) => {
          console.error('Error al cargar los roles:', err);
        }
      });
    }
 }

  // Método para cerrar el modal utilizando NgbActiveModal
  cerrarModal() {
    this.activeModal.close();  // Cerramos el modal
  }

  // Método para guardar los cambios (simulado)
  guardarCambios() {
    if(this.modo=== 'editar'){
      this.editEmpleado();
    }else{
      this.addEmpleado();
    }

    this.cerrarModal();  // Cerrar el modal después de guardar

  }

  getRoles(): void {
    this.apiRol.getRoles().subscribe({
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
    // Aquí estamos creando el objeto empleado con los valores que llegan del formulario
    const empleado: Empleado = {
      guid:  this.usuarioData.guidCentro,  // Puedes generar o asignar un GUID único
      nombre: this.empleado.nombre,  // Se asigna el valor de "nombre" del formulario
      apellido: this.empleado.apellido,  // Se asigna el valor de "apellido" del formulario
      tipoDocumento: this.empleado.tipoDocumento,  // Se asigna el valor de "tipoDocumento" del formulario
      documento: this.empleado.numeroDocumento,  // Asignamos "numeroDocumento" al campo "documento"
      telefono: this.empleado.telefono,  // Asignamos el "telefono" del formulario
      email: this.empleado.email,  // Asignamos el "email" del formulario
      direccion: this.empleado.direccion,  // Asignamos la "direccion" del formulario
      estado: this.empleado.estado,  // Asignamos el "estado" del formulario
      guidRol: this.empleado.guidRol,  // Asignamos el rol seleccionado
      guidCentro: this.usuarioData.guidCentro,  // Asignamos el centro del formulario
      usuario: this.empleado.usuario,  // Asignamos el "usuario" del formulario
      contraseña: this.empleado.contrasena  // Asignamos la "contraseña" del formulario
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
    // Aquí estamos creando el objeto empleado con los valores que llegan del formulario
    const empleado: Empleado = {
      guid:  this.empleado.guid,  // Puedes generar o asignar un GUID único
      nombre: this.empleado.nombre,  // Se asigna el valor de "nombre" del formulario
      apellido: this.empleado.apellido,  // Se asigna el valor de "apellido" del formulario
      tipoDocumento: this.empleado.tipoDocumento,  // Se asigna el valor de "tipoDocumento" del formulario
      documento: this.empleado.numeroDocumento,  // Asignamos "numeroDocumento" al campo "documento"
      telefono: this.empleado.telefono,  // Asignamos el "telefono" del formulario
      email: this.empleado.email,  // Asignamos el "email" del formulario
      direccion: this.empleado.direccion,  // Asignamos la "direccion" del formulario
      estado: this.empleado.estado,  // Asignamos el "estado" del formulario
      guidRol: this.empleado.guidRol,  // Asignamos el rol seleccionado
      guidCentro: this.usuarioData.guidCentro,  // Asignamos el centro del formulario
      usuario: this.empleado.usuario,  // Asignamos el "usuario" del formulario
      contraseña: this.empleado.contrasena  // Asignamos la "contraseña" del formulario
    };
     // Llamamos al servicio API para agregar el empleado
    this.apiEmpleado.edit(empleado).subscribe(respuesta => {
      // Si la respuesta tiene éxito, cerramos el modal y mostramos un mensaje
      console.log(respuesta.exito);
      if (respuesta.exito === 1) {
        this.cerrarModal(); // Cierra el modal
      } else {
        this.cerrarModal();;  // Cierra el modal
      }
    });
  }
}
