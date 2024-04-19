import {Router, Routes} from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

export const route: Routes = [

      {
        path: '',
        loadComponent : ()=> import('./home.component').then( c=>c.HomeComponent),
            children: [
              {
                path: 'users',
                loadComponent : ()=> import( './usuarios/usuarios.component').then( c=>UsuariosComponent)
              },
              {
                path : 'components',
                loadComponent: ()=> import('./componentes/componentes.component').then( c=> c.ComponentesComponent)
              },
              {
                path : 'teams',
                loadComponent: ()=> import('./equipos/equipos.component').then( c=> c.EquiposComponent),

              },
              {
                path: 'new-team',
                loadComponent : ()=>import ('./equipos/new-equipos/new-equipo.component').then(c=>c.NewEquipoComponent)
               },
              {
                path : 'informs',
                loadComponent: ()=> import('./informes/informes.component').then( c=>c.InformesComponent)
              },
              {
                path : 'settings',
                loadComponent: ()=> import('./configuracion/configuracion.component').then( c=>c.ConfiguracionComponent)
              },
              {
                path : 'new-category',
                loadComponent: ()=> import('./configuracion/new-categorias/new-categorias.component').then( c=>c.NewCategoriasComponent)
              },

              {
                path: '',
                pathMatch: 'full',
                redirectTo : 'users'
              },


            ]
      },
      {
          path: 'user-inactive',
          loadComponent: ()=> import('./user-inactive/user-inactive.component').then(c=> c.UserInactiveComponent)
      }
]