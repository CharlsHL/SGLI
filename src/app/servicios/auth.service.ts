import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  // Método para verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    // Verifica si está en el entorno del navegador
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('TOKEN'); // Retorna true si hay un token en localStorage
    }
    return false;
  }

  // Método para guardar el token en localStorage
  setToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('TOKEN', token);
    }
  }

  // Método para obtener el token
  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('TOKEN');
    }
    return null;
  }
}
