import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss'],
  standalone: true,
  imports : [ IonicModule, CommonModule]
})
export class InformesComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
