import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ToolbarComponent } from "../../sharedComponents/toolbar/toolbar.component";
import { link } from 'fs';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-equipos',
    templateUrl: './equipos.component.html',
    styleUrls: ['./equipos.component.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, ToolbarComponent, RouterLink]
})
export class EquiposComponent  implements OnInit {


  constructor() { }

  ngOnInit() {  console.log('log1')}


}
