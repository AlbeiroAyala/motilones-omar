
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginUser } from 'src/app/interfaces/pipes/interfaces';
import { AuthService } from '../../servicios/auth.service';




@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  standalone:true,
  imports: [ IonicModule, CommonModule, ReactiveFormsModule]
})
export class LoginPageComponent  implements OnInit {
   data!: any;
   formLogin!: FormGroup
  constructor(private router: Router, private auth: AuthService ) { 
    this.formLogin = new FormGroup({
       email: new FormControl('', Validators.required),
       password: new FormControl('', Validators.required)
    })
  }

  ngOnInit() { 
 
  }
  
  async irInicio(){
      try {
        await this.router.navigateByUrl('/main-page');      
      } catch (error) {
        alert('la ruta no existe')
      }
  }
  
 async  initSesion(){
    if(this.formLogin.valid){
       const claves : LoginUser = this.formLogin.value as LoginUser;
        console.log( claves)
        try {
          await this.auth.loginDb(claves);
           console.log('ingreso ')
        } catch (error) {
          console.log('usuario no existe')
          
          
        }
        // envair  ala bd para ver si esxiste}
        // soine xistes reg¿dirgir al dasbord
        // si no avaisar datos no vlaidos usio no registard
      
      return
       
    }
    alert('formualrio no vlaido')
  }

}
