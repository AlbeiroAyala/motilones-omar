import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { User } from '../../../interfaces/pipes/interfaces';

@Component({
  selector: 'app-photo-user',
  templateUrl: './photo-user.component.html',
  styleUrls: ['./photo-user.component.scss'],
  standalone: true,
  imports: [ CommonModule, IonicModule]
})
export class PhotoUserComponent  implements OnInit {
  @Input({ required: true }) user!: User;
  constructor(
    private modalPhoto: ModalController
  ) { }

  async ionViewWillEnter(){
    console.log( this.user)
  }

  ngOnInit() { }

  async close(){
      await this.modalPhoto.dismiss();
  }

}
