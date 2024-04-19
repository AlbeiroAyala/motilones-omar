import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-componentes',
  templateUrl: './componentes.component.html',
  styleUrls: ['./componentes.component.scss'],
  standalone: true,
  imports : [ IonicModule, CommonModule]
})
export class ComponentesComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
