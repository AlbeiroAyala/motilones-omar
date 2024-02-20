import {Router, Routes} from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component';

export const route: Routes = [
      {
         path: 'dashboard',
         loadComponent : ()=> import( './dashboard/dashboard.component').then( m=> m.DashboardComponent) 
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
]