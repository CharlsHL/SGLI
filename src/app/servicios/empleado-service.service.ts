import { Injectable } from '@angular/core';
import { appSettings } from '../settings/appSettings ';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Respuesta } from '../Infertaz/Respuesta';
import { Empleado } from '../modelos/empleado';
import { validacionToken } from '../settings/validacionToken ';
import { rol } from '../modelos/rol';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoServiceService {

  private apiUrl =appSettings.apiURL+"Empleados";
  constructor(private http: HttpClient) { 
  }
  
  getEmpleados(): Observable<Respuesta> {
    const token = localStorage.getItem('TOKEN');
    if (!token) {
      throw new Error('Token not found');
    }
    const cleanedToken = token.replace(/"/g, '').trim();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${cleanedToken}`
    });
    return this.http.get<Respuesta>(`${this.apiUrl}/ObtenerTodosLosEmpleados`, { headers });
  }
  
  getRol(rol: rol):Observable<Respuesta>{
    return this.http.post<Respuesta>(this.apiUrl+'/rolEmpleado',rol);
  }

  add(empleado: Empleado): Observable<Respuesta> {
    const headers = validacionToken.getToken();

    return this.http.post<Respuesta>(`${this.apiUrl}/CreateUser`, empleado, { headers });
  }

  edit(empleado: Empleado):Observable<Respuesta>{
    const headers = validacionToken.getToken();
    return this.http.put<Respuesta>(this.apiUrl+"/Editar",empleado,{ headers });
  }

  reactivar (proveedor: Empleado):Observable<Respuesta>{
    return this.http.put<Respuesta>(this.apiUrl+"/Reactivar",proveedor);
  }

  deleteEmpleado(empleado: Empleado): Observable<Respuesta> {
    const url2 = `${this.apiUrl}/EliminarEmpleado?guidEmpleado=${encodeURIComponent(empleado.guid)}`;
    const headers = validacionToken.getToken();

    return this.http.delete<Respuesta>(url2, { headers });
  }
}
