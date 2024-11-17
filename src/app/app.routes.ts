import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { authGuard } from './authGuard';

export const routes: Routes = [ { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [authGuard], // Usa el authGuard aquí
      children: [
        { path: 'inicio', component: InicioComponent },
        
      ],
    },
  ];