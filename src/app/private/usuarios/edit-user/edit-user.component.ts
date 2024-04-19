import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { User } from 'src/app/interfaces/pipes/interfaces';
import { DbService } from 'src/app/servicios/db.service';
import { UiService } from 'src/app/servicios/ui.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  standalone: true,
  imports : [ IonicModule, CommonModule, ReactiveFormsModule]
})
export class EditUserComponent  implements OnInit {
  @Input({ required: true }) user!: User;

  formUser !: FormGroup
  constructor(
    private modalPhoto: ModalController,
    private db: DbService,
    private ui: UiService,
  ) {

     this.formUser = new FormGroup({
        nombres : new FormControl('', Validators.required),
        telefono: new FormControl('', Validators.required),
        direccionCasa:  new FormControl('', Validators.required),
        fechaCumple:  new FormControl(''),
        cedula: new FormControl('', Validators.required),
        avatar:  new FormControl(''),
        profesion: new FormControl('', Validators.required),
        uidUser: new FormControl(''),

     })
  }

  ngOnInit() {
      this.formUser.patchValue(this.user);
  }
  async close(user? : User){
    await this.modalPhoto.dismiss(user);
  }

 async  onsubmit(){
    if(this.formUser.valid){
       try {
         await this.ui.showLoading('actualizando...');
          await this.db.updateDocUser('app_users',this.formUser.value.uidUser, this.formUser.value );
          const user=  this.updateLocal(this.user, this.formUser.value)
          await this.ui.hideLoading();
          await this.close(user)
       } catch (error) {
        await this.ui.hideLoading();
        await this.ui.alertAutoHide('Ocurrio un error , intentalo de nuevo')
        console.log(error)
       }
    }
  }

  updateLocal(user: User, data: any){
   const userUpdate=  {...user, cedula: data.cedula,
    direccionCasa: data.direccionCasa,
    fechaCumple: data.fechaCumple,
    nombres: data.nombres,
    profesion: data.profesion,
    telefono    : data.telefono,
    avatar    : data.avatar,
   }
    return userUpdate
  }

}
