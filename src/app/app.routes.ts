import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'main-page',
    loadComponent: () => import('./public/main-page/main-page.component').then((m) => m.MainPageComponent),
  },
  {
    path: '',
    redirectTo: 'main-page',
    pathMatch: 'full',
  },
  {
    path: 'login-page',
    loadComponent: () => import('./public/login-page/login-page.component').then((m) => m.LoginPageComponent),
  },
];
