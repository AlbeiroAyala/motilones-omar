import { Routes } from '@angular/router';
import { redirectLoggedInTo, redirectUnauthorizedTo, canActivate}  from '@angular/fire/auth-guard'
  const redirectoHome= ()=> redirectLoggedInTo([ '/home']);
  const redirectoLogin= ()=> redirectUnauthorizedTo(['/'])
export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./public/login/login.component').then((m) => m.LoginComponent),
    ...canActivate (redirectoHome)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren : ()=> import('./private/home.routes').then( r=> r.route),
    ...canActivate (redirectoLogin)
  },
];
