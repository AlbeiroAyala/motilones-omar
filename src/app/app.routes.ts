import { Routes } from '@angular/router';
import { redirectLoggedInTo, redirectUnauthorizedTo, canActivate}  from '@angular/fire/auth-guard'
  const redirectoHome= ()=> redirectLoggedInTo([ '/home']);
  const redirectoLogin= ()=> redirectUnauthorizedTo(['/'])
export const routes: Routes = [
  {
    path: 'public',
    loadChildren: () => import('./public/public.routes').then( r=>r.route),
    ...canActivate (redirectoHome)
  },
  {
    path: '',
    redirectTo: 'public',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren : ()=> import('./private/home.routes').then( r=> r.route),
    ...canActivate (redirectoLogin)
  },
];
