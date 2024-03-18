import {Router, Routes} from '@angular/router'


export const route: Routes = [

      {
        path: '',
            children: [
              {
                  path: 'login',
                  loadComponent : ()=> import( './login/login.component').then(c=> c.LoginComponent)
              },
              {
                path: '',
                pathMatch: 'full',
                redirectTo : 'login'
              },
              {
                path: 'reset-password',
                loadComponent : ()=> import( './reset-password/reset-password.component').then( c=>c.ResetPasswordComponent)
              },
              {
                path: 'register',
                loadComponent : ()=> import( './register/register.component').then( c=>c.RegisterComponent)
              }
            ]
      }
]