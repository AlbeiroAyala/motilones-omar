import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { DbService } from 'src/app/servicios/db.service';
import { UiService } from 'src/app/servicios/ui.service';
import { ModalCategoriaComponent } from './modal-categoria/modal-categoria.component';
import { Categoria } from 'src/app/interfaces/pipes/interfaces';
import { FormsModule } from '@angular/forms';
import { BuscadorPipe } from 'src/app/pipes/buscador.pipe';


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss'],
  standalone:true,
  imports: [ IonicModule, CommonModule,RouterLink , FormsModule, BuscadorPipe]
})
export class ConfiguracionComponent  implements OnInit {
   listCategorias! : Categoria[];
   valorBuscado!: string;
  constructor(
      private db : DbService,
      private ui: UiService,
      private modal: ModalController

  ) {
    this.getCategorias();
  }

  ngOnInit() {

  }

  getCategorias(){
      this.db.getCollection('admin_categoria').subscribe( data=>{
        this.listCategorias = [];
           if(data.empty){
             return
           }
            data.forEach(  docs =>{
                this.listCategorias.push( docs.data() as Categoria)
            })

            //console.log(this.listCategorias)
      }, error=>{}  )
  }
 async  showModal(){
    const md = await this.modal.create({
         component: ModalCategoriaComponent,

    })
    md.present();
   const {data}= await  md.onDidDismiss();
      if(data){
         this.listCategorias.push(data.categoria);
      }

  }



}
