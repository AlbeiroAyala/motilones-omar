import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DbService } from 'src/app/servicios/db.service';
import { UiService } from 'src/app/servicios/ui.service';

@Component({
  selector: 'app-new-equipo',
  templateUrl: './new-equipo.component.html',
  styleUrls: ['./new-equipo.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink]
})
export class NewEquipoComponent  implements OnInit {
    dataCategorias!: any;
  constructor(
      private db: DbService,
      private ui: UiService,
  ) { }

  ngOnInit() {
      this.getCategorias()
  }

 async  getCategorias(){

  await this.ui.showLoading('Cargando')
       this.db.getCollection('admin_categorias').subscribe(async data=>{
           await  this.ui.hideLoading()
           if( data.empty){
             return;
           }
            let datos: any={};
            data.forEach( docs=>{
                 datos = docs.data();
                 this.dataCategorias =(docs.data() as any).categorias;
            })

            console.log(datos)
       }  )
  }

  showCategoria(categoria: any){
     console.log(categoria)
  }

}
