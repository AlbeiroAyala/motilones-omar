import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { loginAuth } from 'src/app/interfaces/pipes/interfaces';
import { AuthService } from 'src/app/servicios/auth.service';
import { UiService } from 'src/app/servicios/ui.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, ReactiveFormsModule
  
  
  
  ],
})
export class LoginComponent  implements OnInit {

  data!: loginAuth;
  formLogin!: FormGroup
 constructor(private router: Router, private auth: AuthService, private ui: UiService ) { 
  
  
   this.formLogin = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
   })
 }

async  ngOnInit() { 
 }
 

 
async  doLogin(){
   if(this.formLogin.valid){
      const claves : loginAuth = this.formLogin.value as loginAuth;  
       try {
         await this.ui.showLoading('Validando Credenciales')
         await this.auth.loginDb(claves);         
         await this.router.navigateByUrl('/home');
         await this.ui.hideLoading();
         return;      
       } catch (error: any) { 
          await this.auth.logout() ;
          await this.ui.hideLoading();  
          await this.ui.alert('Notificación',error.code?? 'Error Desconocido ');
       }     
     return      
   }  
 }
 

}
