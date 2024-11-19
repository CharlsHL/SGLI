import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { authGuard } from './authGuard';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { ProveedoresComponent } from './componentes/proveedores/proveedores.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { ComprasComponent } from './componentes/compras/compras.component';
import { VentasComponent } from './componentes/ventas/ventas.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';

export const routes: Routes = [ { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [authGuard], // Usa el authGuard aquí
      children: [
        { path: 'inicio', component: InicioComponent },
        { path: 'usuarios', component: UsuariosComponent },
        { path: 'clientes', component: ClientesComponent },
        { path: 'proveedores', component: ProveedoresComponent },        
        { path: 'productos', component: ProductosComponent },
        { path: 'compras', component: ComprasComponent },
        { path: 'ventas', component: VentasComponent },
      ],
    },
  ];