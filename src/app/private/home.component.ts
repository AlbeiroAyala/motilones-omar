import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UiService } from '../servicios/ui.service';
import { AuthService } from '../servicios/auth.service';
import { User } from '../interfaces/pipes/interfaces';
import { DbService } from '../servicios/db.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, RouterModule]
})
export class HomeComponent  implements OnInit {
   user!: User;
   stop$= new Subject<void>;
  constructor(  private router: Router,
    private ui: UiService,
    private auth: AuthService,
    private db: DbService
    ) { }

 async  ngOnInit() {  }

  async ionViewWillEnter(){
    this.user=  this.router.getCurrentNavigation()?.extras?.state?.['userdb'];
    if(!this.user){
        this.user = await this.ui.getDataLocalstorage('user');
    }
     this.userChange(this.user.uidUser);
    if(!this.user.isActive){
      await  this.ui.setDataLocalstorage('user', this.user);
      this.router.navigateByUrl('/home/user-inactive');
    }

    // validar si es tecnico o admin

  }

  userChange(uid: string){
    this.db.getUserValueChanges('app_users',uid).pipe(takeUntil(this.stop$)).subscribe( async (data:any)=>{
      //console.log(data)
       if( !data.isActive){
          await  this.ui.setDataLocalstorage('user', data);
          this.router.navigateByUrl('/home/user-inactive');
       }
 }  )
  }






   async navigateGo(url: string){
        try {
          await this.router.navigateByUrl(`/home/${url}`  )
        } catch (error: any) {
           await this.ui.alert('Error', 'Intentalo de Nuevo');
        }
   }

  async  doLogout(){
    const res=  await this.ui.alertOfOn('Cerrar Sesion !','');
    if(res){
      try {
         await  this.auth.logout();
         await this.router.navigateByUrl('/');
        } catch (error) {
          await this.ui.alert('Error', 'Intentalo de Nuevo');
        }
      }
    }

    ionViewDidLeave(){
      this.stop$.next();
      this.stop$.complete();
   }

}
