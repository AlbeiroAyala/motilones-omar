import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UiService } from '../servicios/ui.service';
import { AuthService } from '../servicios/auth.service';
import { User } from '../interfaces/pipes/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, RouterModule]
})
export class HomeComponent  implements OnInit {
   user!: User;
  constructor(  private router: Router, private ui: UiService, private auth: AuthService) { }

  ngOnInit() {
   this.user=  this.router.getCurrentNavigation()?.extras?.state?.['userdb'];
  

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
   
   

}
