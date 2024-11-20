import { HttpHeaders } from "@angular/common/http";

export class validacionToken {
    static getToken(): HttpHeaders {
        const token = localStorage.getItem('TOKEN');
        if (!token) {
            throw new Error('Token not found');
        }
        // Limpiar el token de comillas o espacios
        const cleanedToken = token.replace(/"/g, '').trim();
        return new HttpHeaders({
            'Authorization': `Bearer ${cleanedToken}`,
            'Content-Type': 'application/json'
        });
    }
}