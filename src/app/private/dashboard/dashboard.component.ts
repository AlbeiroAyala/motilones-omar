import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { UiService } from 'src/app/servicios/ui.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, RouterModule]
})
export class DashboardComponent  implements OnInit {

  constructor(private auth: AuthService,private router: Router, private ui: UiService) { }

  ngOnInit() {}

  async cerrarSesion(){
    try {
      await  this.auth.logout();
      await this.router.navigateByUrl('/');
    } catch (error) {
       await this.ui.alert('Notificacion','ocurrio un errro al cerarr sesion');
    }
  }

}
