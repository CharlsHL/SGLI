import { Injectable } from '@angular/core';
import { UserCacheServiceService } from './user-cache-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private userCache: UserCacheServiceService) {}

  // Verifica si el usuario está autenticado
  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      return !!localStorage.getItem('TOKEN');
    }
    return false;
  }

  // Guarda el token y el perfil (como objeto deserializado) en el localStorage y la caché
  setAuthData(token: string, perfilJson: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('TOKEN', token);
      localStorage.setItem('PERFIL', perfilJson);

      // Deserializar el perfil y almacenarlo en la caché
      const perfil = JSON.parse(perfilJson);
      this.userCache.setUserData({ token, perfil });
    }
  }

  // Obtiene el perfil del usuario
  getPerfil(): any | null {
    // Primero, intentar desde la caché
    if (this.userCache.isCacheLoaded()) {
      return this.userCache.getUserData()?.perfil;
    }

    // Si no está en la caché, intentar desde localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      const perfilJson = localStorage.getItem('PERFIL');
      if (perfilJson) {
        const perfil = JSON.parse(perfilJson);
        this.userCache.setUserData({ token: localStorage.getItem('TOKEN'), perfil });
        return perfil;
      }
    }

    return null;
  }
  // Elimina el token y los datos del perfil al cerrar sesión
  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('TOKEN');
      localStorage.removeItem('PERFIL');
    }
    this.userCache.clearCache(); // Limpiar también la caché
  }
}