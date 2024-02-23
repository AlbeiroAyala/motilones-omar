import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule]
})
export class UsuariosComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
