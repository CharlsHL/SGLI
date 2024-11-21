import { Injectable } from '@angular/core';
import { appSettings } from '../settings/appSettings ';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Respuesta } from '../Infertaz/Respuesta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private apiUrl =appSettings.apiURL+"Rol";
  constructor(private http: HttpClient) { 
  }
  
  getRoles(): Observable<Respuesta> {
    const token = localStorage.getItem('TOKEN');
    if (!token) {
      throw new Error('Token not found');
    }
    // Limpiar el token de comillas o espacios
    const cleanedToken = token.replace(/"/g, '').trim();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${cleanedToken}`
    });  
    
    return this.http.get<Respuesta>(`${this.apiUrl}/ObtenerTodosLosRoles`, { headers });
  }
}
