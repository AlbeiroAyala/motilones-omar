import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DbService } from 'src/app/servicios/db.service';
import { UiService } from 'src/app/servicios/ui.service';

@Component({
  selector: 'app-new-categorias',
  templateUrl: './new-categorias.component.html',
  styleUrls: ['./new-categorias.component.scss'],
  standalone:true,
  imports: [ IonicModule, CommonModule, RouterLink, ReactiveFormsModule ]
})
export class NewCategoriasComponent  implements OnInit {
    formCategoria! : FormsModule;
  constructor(
    private db: DbService,
    private ui: UiService
  ) { }

  ngOnInit() {}
  showCategoria(categoria: any){
    console.log(categoria)
 }



    createNewCategoria(){
       //this.db.createDocument('admin_categoria',data)
    }
}
