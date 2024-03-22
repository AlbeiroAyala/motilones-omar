import {Router, Routes} from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

export const route: Routes = [

      {
        path: '',
        loadComponent : ()=> import('./home.component').then( c=>c.HomeComponent),
            children: [
              {
                path: 'usuarios',
                loadComponent : ()=> import( './usuarios/usuarios.component').then( c=>UsuariosComponent)
              },
              {
                path: '',
                pathMatch: 'full',
                redirectTo : 'usuarios'
              },


            ]
      },
      {
          path: 'user-inactive',
          loadComponent: ()=> import('./user-inactive/user-inactive.component').then(c=> c.UserInactiveComponent)
      }
]