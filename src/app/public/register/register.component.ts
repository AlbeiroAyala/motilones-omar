import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Route, Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { User } from 'firebase/auth';
import { throwError } from 'rxjs';
import { OrmDb } from 'src/app/ORMbases/user';
import { loginAuth } from 'src/app/interfaces/pipes/interfaces';
import { AuthService } from 'src/app/servicios/auth.service';
import { DbService } from 'src/app/servicios/db.service';
import { UiService } from 'src/app/servicios/ui.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink, ReactiveFormsModule],
})
export class RegisterComponent implements OnInit {
  formRegister!: FormGroup;
  constructor(
    private ui: UiService,
    private db: DbService,
    private auth: AuthService,
    private router: Router
  ) {
    this.formRegister = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  async onRegister() {
    if (this.formRegister.valid) {
      await this.ui.showLoading('validando...');
      const datos: loginAuth = this.formRegister.value as loginAuth;

      try {
        const user = await this.auth.createUserAuth(datos);
        if (user.user) {
          const id = user.user.uid;
          const userdb = new OrmDb().createUser(datos.email, id);
          await this.db.createUserDb(userdb);
          await this.ui.hideLoading();
          await this.ui.alertAutoHide('Usuario Creado con exito');
          await  this.ui.setDataLocalstorage('user', userdb);
          await  this.router.navigateByUrl('/home',{ state : { userdb}});
          return;
        }
        await this.ui.hideLoading();
        await this.ui.alert('Error', 'No pudimos creaar el usuario');
      } catch (error: any) {
        await this.ui.hideLoading();
        await this.ui.alert('Error', error.code);
      }
      return;
    }
  }
}
