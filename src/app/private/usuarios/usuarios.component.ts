import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { loginAuth } from 'src/app/interfaces/pipes/interfaces';
import { AuthService } from 'src/app/servicios/auth.service';
import { DbService } from 'src/app/servicios/db.service';
import { UiService } from 'src/app/servicios/ui.service';
import { environment } from 'src/environments/environment';
import { User}  from '../../interfaces/pipes/interfaces'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, ReactiveFormsModule]
})
export class UsuariosComponent  implements OnInit {
  formCreateUser!: FormGroup;
  user!: any;
  limiteConsults= environment.limite;
  users!:  User[];
  constructor(private auth: AuthService,
     private db: DbService,
     private ui: UiService) {
    this.formCreateUser = new FormGroup({
        email: new FormControl( '', Validators.required ),
        password: new FormControl('', Validators.required)
    })
  }

async   ngOnInit() {
  }
  async ionViewWillEnter(){
    this.user=   await this.auth.curretnUser();
    console.log(this.user)
    if( this.user){
       this.users=[]
       this.getUsersAll();
    }
    console.log(this.user)
  }


  async getUsersAll(){
      await this.ui.showLoading('Cargando...')
      this.db.getUsersAll('app_users', this.limiteConsults ).pipe().subscribe(async  data=>{
        this.users=[]
          await this.ui.hideLoading();
         if( data.empty){
             await this.ui.alertAutoHide('No hay  usuarios activos ');
            return;
         }
         data.forEach( doc=> {
             this.users.push( doc.data() as User )
         })

         this.users= this.users.filter( user=> user.uidUser !== this.user.uid);
         console.log(this.users)
      },async  error=>{
        await this.ui.hideLoading();
        await this.ui.alertAutoHide('Error al obtener los usuarios')
        console.log(error)
      }  )
  }
 async  toggleUser(user: User){
    const msg= user.isActive? 'Inactivar': 'Activar'
    const res=  await  this.ui.alertOfOn('Advertencia', `Deseas ${msg} el tecnico ${ user.nombres} ` );
     if( res){
        try {
          await this.ui.showLoading('Actualizando...');
          await this.db.updateDocForOneParamBoolen('app_users',user.uidUser, !user.isActive);
              this.users.filter( us=> {
                if(us.uidUser === user.uidUser ){
                  us.isActive = !us.isActive
                }
            })
            await this.ui.hideLoading();
        } catch (error) {
          await this.ui.hideLoading();
          await this.ui.alertAutoHide('Ocurrio un error, intentalo de nuevo')
        }


       console.log('actualizxando usueer')
     }
  }

}
