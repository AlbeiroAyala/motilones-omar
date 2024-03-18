import { User } from './../../interfaces/pipes/interfaces';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { DbService } from 'src/app/servicios/db.service';
import { UiService } from 'src/app/servicios/ui.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';


@Component({
  selector: 'app-user-inactive',
  templateUrl: './user-inactive.component.html',
  styleUrls: ['./user-inactive.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule ]
})
export class UserInactiveComponent  implements OnInit {
    stop$= new Subject<void>;
  constructor(
    private db : DbService,
    private ui: UiService,
    private router: Router,
    private auth :  AuthService
  ) { }

  async ngOnInit() {
  }

  async ionViewWillEnter(){
    const  userLocal: User=  await  this.ui.getDataLocalstorage('user');
    this.db.getUserValueChanges('app_users', userLocal.uidUser).pipe(takeUntil(this.stop$)).subscribe( async (data:any)=>{
         console.log(data)
          if( data.isActive){
             await  this.ui.setDataLocalstorage('user', data);
             this.router.navigateByUrl('/home')
          }
    }  )
  }

  async cerrarSesion(){
    try {
      await  this.auth.logout();
      await  this.ui.removeDataLocalstorage('user');
      await this.router.navigateByUrl('/');

    } catch (error) {
       await this.ui.alert('Notificacion','ocurrio un errro al cerarr sesion');
    }
  }
  ionViewDidLeave(){
     this.stop$.next();
     this.stop$.complete();
  }

}
