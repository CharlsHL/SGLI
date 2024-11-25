import { Injectable } from '@angular/core';
import { appSettings } from '../settings/appSettings ';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Respuesta } from '../Infertaz/Respuesta';
import { Observable } from 'rxjs';
import { validacionToken } from '../settings/validacionToken ';
import {Cliente} from '../modelos/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl =appSettings.apiURL+"Cliente";
  constructor(private http: HttpClient) { 
  }
  
  getClientes(guid: string): Observable<Respuesta> {
    const token = localStorage.getItem('TOKEN');
    if (!token) {
      throw new Error('Token not found');
    }
    const cleanedToken = token.replace(/"/g, '').trim();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${cleanedToken}`
    });
    return this.http.get<Respuesta>(`${this.apiUrl}/ObtenerTodosLosClientes?guidCentro=${encodeURIComponent(guid)}`, { headers });
  }


  add(cliente: Cliente): Observable<Respuesta> {
    const headers = validacionToken.getToken();

    return this.http.post<Respuesta>(`${this.apiUrl}/CreateCliente`, cliente, { headers });
  }

  edit(cliente: Cliente):Observable<Respuesta>{
    const headers = validacionToken.getToken();
    return this.http.put<Respuesta>(this.apiUrl+"/EditarCliente",cliente,{ headers });
  }

  reactivar (cliente: Cliente):Observable<Respuesta>{
    return this.http.put<Respuesta>(this.apiUrl+"/Reactivar",cliente);
  }

  deleteCliente(cliente: Cliente): Observable<Respuesta> {
    const url2 = `${this.apiUrl}/EliminarCliente?guidCliente=${encodeURIComponent(cliente.guid)}`;
    const headers = validacionToken.getToken();

    return this.http.delete<Respuesta>(url2, { headers });
  }
}