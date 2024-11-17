import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appSettings } from '../settings/appSettings ';
import { Observable } from 'rxjs';
import { Respuesta } from '../Infertaz/Respuesta';
import { login } from '../Infertaz/Login';

@Injectable({
  providedIn: 'root'
})
export class LogInService {

  private http = inject(HttpClient);
  private apiUrl:String =appSettings.apiURL+"UsuarioCuenta";
  constructor() { }

  getIniciarSesion(login: login):Observable<Respuesta>{
    return this.http.post<Respuesta>(this.apiUrl+"/Validar",login);
  }

  recuperarContraseña(correo: string):Observable<Respuesta>{
    const url =this.apiUrl+`/Recuperar?request=${encodeURIComponent(correo)}`;
    return this.http.get<Respuesta>(url,);
  }
}
