import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports : [ IonicModule, CommonModule]
})
export class ToolbarComponent  implements OnInit {
  message: string = "Hola Mundo!";
  constructor() { }

  ngOnInit() {}


}
