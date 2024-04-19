import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Categoria } from 'src/app/interfaces/pipes/interfaces';
import { DbService } from 'src/app/servicios/db.service';
import { UiService } from 'src/app/servicios/ui.service';

@Component({
  selector: 'app-modal-categoria',
  templateUrl: './modal-categoria.component.html',
  styleUrls: ['./modal-categoria.component.scss'],
  standalone:true,
  imports: [ IonicModule, CommonModule, ReactiveFormsModule ]
})
export class ModalCategoriaComponent  implements OnInit {
  formCategoria! : FormGroup;
  constructor(
    private db: DbService,
    private ui: UiService,
    private mdCate: ModalController
  ) {
      this.formCategoria = new FormGroup({
        nombreCategoria:  new FormControl('', [Validators.required]),
        isActive: new FormControl(true, Validators.required),
        uid: new FormControl( String(Date.now()),Validators.required ),
        fechaCreate: new FormControl(Date.now(), Validators.required)
      })
  }

  ngOnInit() {}

  async close(data?: any){
     await  this.mdCate.dismiss(data);
  }
 async  onSubimit(){
      if(this.formCategoria.valid){
           await this.ui.showLoading('Creando...')
          try {
            await this.db.createDocument('admin_categoria', this.formCategoria.value as Categoria);
            await this.ui.hideLoading();
             await this.close( {success: true, categoria: this.formCategoria.value})

          } catch (error) {
            await this.ui.hideLoading();
            await this.ui.alertAutoHide('Ocurrio un error, intentalo de nuevo.')

          }
      }
    }

}
