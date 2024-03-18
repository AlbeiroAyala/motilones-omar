import {Router, Routes} from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

export const route: Routes = [

      {
        path: '',
        loadComponent : ()=> import('./home.component').then( c=>c.HomeComponent),
            children: [
              {
                  path: 'dashboard',
                  loadComponent : ()=> import( './dashboard/dashboard.component').then( m=> m.DashboardComponent)
              },
              {
                path: '',
                pathMatch: 'full',
                redirectTo : 'dashboard'
              },
              {
                path: 'usuarios',
                loadComponent : ()=> import( './usuarios/usuarios.component').then( c=>UsuariosComponent)
              },

            ]
      },
      {
          path: 'user-inactive',
          loadComponent: ()=> import('./user-inactive/user-inactive.component').then(c=> c.UserInactiveComponent)
      }
]