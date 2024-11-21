import { Injectable } from '@angular/core';
import { appSettings } from '../settings/appSettings ';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Respuesta } from '../Infertaz/Respuesta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CentroService {

  private apiUrl =appSettings.apiURL+"Centro";
  constructor(private http: HttpClient) { 
  }
  
  getCentro(guid: string): Observable<Respuesta> {
    const token = localStorage.getItem('TOKEN');
    if (!token) {
      throw new Error('Token not found');
    }
    // Limpiar el token de comillas o espacios
    const cleanedToken = token.replace(/"/g, '').trim();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${cleanedToken}`
    });  
    const url2 = `${this.apiUrl}/ObtenerCentro?guid=${encodeURIComponent(guid)}`;
    return this.http.get<Respuesta>(`${this.apiUrl}/ObtenerCentro?guid= ${encodeURIComponent(guid)}`, { headers });
  }
}