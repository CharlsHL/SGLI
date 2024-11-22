import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserCacheServiceService {

  private userCache: any = null; // Aquí se almacena la información del usuario

  constructor() {}

  // Método para cargar los datos en la caché
  setUserData(user: any): void {
    this.userCache = user;
  }

  // Método para obtener los datos del usuario
  getUserData(): any {
    return this.userCache;
  }

  // Método para limpiar la caché (por ejemplo, al cerrar sesión)
  clearCache(): void {
    this.userCache = null;
  }

  // Método para verificar si la caché está cargada
  isCacheLoaded(): boolean {
    return this.userCache !== null;
  }
}
