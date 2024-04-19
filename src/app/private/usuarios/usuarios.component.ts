import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { loginAuth } from 'src/app/interfaces/pipes/interfaces';
import { AuthService } from 'src/app/servicios/auth.service';
import { DbService } from 'src/app/servicios/db.service';
import { UiService } from 'src/app/servicios/ui.service';
import { environment } from 'src/environments/environment';
import { User}  from '../../interfaces/pipes/interfaces'
import { PhotoUserComponent } from './photo-user/photo-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

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
     private ui: UiService,
     private modal: ModalController) {
    this.formCreateUser = new FormGroup({
        email: new FormControl( '', Validators.required ),
        password: new FormControl('', Validators.required)
    })
  }

async   ngOnInit() {
  }
  async ionViewWillEnter(){
    this.user=   await this.auth.curretnUser();
    if( this.user){
       this.users=[]
       this.getUsersAll();
    }
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
         });
         this.users= this.users.filter( user=> user.uidUser !== this.user.uid);

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
     }
  }
   async seePhotoUser(user: User ){
       const modal = await this.modal.create({
         component: PhotoUserComponent,
         componentProps: {
          user
         }
       });
       await  modal.present();
   }

  async  deleteUser(userDelete: User){
         const res = await this.ui.alertOfOn('Advertencia', 'Eliminaras un tecnico del sistema, desea continuar ?');
         if(res){
          try {
             await this.ui.showLoading('eliminando....')
             await  this.db.deleteUser('app_users', userDelete);
             this.users=  this.users.filter(user=> user.uidUser !== userDelete.uidUser);
             await this.ui.hideLoading();

           } catch (error) {
             await this.ui.hideLoading();
             await  this.ui.alertAutoHide('Error al eliminar usuario, intentalo de nuevo');
           }
         }
   }

  async  editUser( user: User){
    const modal = await this.modal.create( {
       component: EditUserComponent,
        componentProps: {
           user
        }
    });
     modal.present();
     const  {data}  = await modal.onWillDismiss();
     if(data){
      this.getUsersAll();
     }
   }
}
