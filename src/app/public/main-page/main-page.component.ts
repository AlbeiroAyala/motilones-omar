import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  standalone: true,
  imports : [ IonicModule, CommonModule, RouterLink]
  
})
export class MainPageComponent  implements OnInit {
   public dataApp= environment.dataApp
  constructor(private router: Router ) { }

  ngOnInit() {
   
  }
  
  async irLogin(){
      try {
        await this.router.navigateByUrl('/login-page');      
      } catch (error) {
        alert('la ruta no existe')
      }
  }

}
