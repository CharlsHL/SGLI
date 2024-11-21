import { Injectable } from '@angular/core';
import { appSettings } from '../settings/appSettings ';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Respuesta } from '../Infertaz/Respuesta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl =appSettings.apiURL+"UsuarioCuenta";
  constructor(private http: HttpClient) { 
  }
  
  getUsuario(guid: string): Observable<Respuesta> {
    const token = localStorage.getItem('TOKEN');
    if (!token) {
      throw new Error('Token not found');
    }
    const cleanedToken = token.replace(/"/g, '').trim();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${cleanedToken}`
    });
    return this.http.get<Respuesta>(`${this.apiUrl}/ObtenerUsuario?guidEmpleado=${encodeURIComponent(guid)}`, { headers });
  }
}
