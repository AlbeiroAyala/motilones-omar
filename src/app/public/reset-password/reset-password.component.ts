import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { UiService } from 'src/app/servicios/ui.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,ReactiveFormsModule],
})
export class ResetPasswordComponent  implements OnInit {
   formResetPassword!: FormGroup;
  constructor(
    private auth: AuthService,
    private ui: UiService,
    private router: Router
  ) {
     this.formResetPassword  = new FormGroup({
       email: new FormControl('', Validators.required)
     })
  }

  ngOnInit() {}

   async onResetPassword(){

      if( this.formResetPassword.valid){
        const email = this.formResetPassword.value.email as string;
          try {
            await this.ui.showLoading('Validando...')
            await this.auth.sendEmailChangePass(email);
            await this.ui.hideLoading();
            await this.ui.alert('', 'Hemos enviado un link a tu correo registrado, siguelo para recuperar tu contraseña, no olvide revisar la bandeja spam');
            await this.router.navigateByUrl("/");

          } catch (error: any) {
            await this.ui.hideLoading();
            await this.ui.alert('Error', error.code);

          }
      }

   }

}
