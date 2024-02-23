import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { OrmDb } from 'src/app/ORMbases/user';
import { loginAuth } from 'src/app/interfaces/pipes/interfaces';
import { AuthService } from 'src/app/servicios/auth.service';
import { DbService } from 'src/app/servicios/db.service';
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
  formLogin!: FormGroup;
  user: any
  stop= new Subject<void>();
 constructor(private router: Router, private auth: AuthService, private ui: UiService, private db: DbService ) { 
  
  
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
         const user =await this.auth.loginDb(claves);      
          if(user.user){
           //console.log(user.user?.uid)
            const userUid= user.user.uid as string;          
             this.db.getUser(userUid).pipe( takeUntil(this.stop)) .subscribe(async (datos)=>{  
                  await this.ui.hideLoading();             
                  if(!datos.exists){
                      await this.auth.logout();                    
                     return
                  }                  
                  const userdb= datos.data();                 
                  await this.router.navigateByUrl('/home', { state : { userdb}});
                  return;
                  
             },async  error=>{ 
              await this.ui.hideLoading();            
              await this.auth.logout();
              await this.ui.alert('Notificación',error.code?? 'No conexion internet ');
             }  )
          }else{
            await this.ui.hideLoading();            
            await this.auth.logout();
          }        
     
         return;      
       } catch (error: any) { 
          console.log(error)
          await this.auth.logout() ;
          await this.ui.hideLoading();  
          await this.ui.alert('Notificación',error.code?? 'Error Desconocido ');
       }     
     return      
   }  
 }
 
 navigateTo(url: string){
  if(this.user){
    //console.log(this.user)
    this.router.navigateByUrl(`private/${url}`,  { state:  { user: this.user }})
  }
} 
  ionViewDidLeave(){
    this.stop.next();
    this.stop.complete();
  }

}
