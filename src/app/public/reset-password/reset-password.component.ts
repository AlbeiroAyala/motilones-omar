import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class ResetPasswordComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
