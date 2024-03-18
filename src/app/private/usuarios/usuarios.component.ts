import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { loginAuth } from 'src/app/interfaces/pipes/interfaces';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone: true,
  imports: [ IonicModule, CommonModule, ReactiveFormsModule]
})
export class UsuariosComponent  implements OnInit {
  formCreateUser!: FormGroup;
  user!: any;
  constructor(private auth: AuthService) {
    this.formCreateUser = new FormGroup({
        email: new FormControl( '', Validators.required ),
        password: new FormControl('', Validators.required)
    })
  }

async   ngOnInit() {
   this.user=   await this.auth.curretnUser();
    console.log(this.user)
  }
// Hgt5BE5YiyLrWQ9Hp2wGiLSLSAI
 async  createNewUser(){
    const data: loginAuth= this.formCreateUser.value as loginAuth;
    console.log(data)
   try {
     const user=  await this.auth.createUserAuth(data);
      await this.auth.sendEmailChangePass(user.user?.email);
      console.log(user);
      console.log('/////////////////////////////')
      await this.auth.logout()
  await this.auth.stateUser().subscribe( user=>{
      console.log(user?.email)
  })
   } catch (error) {
      console.log(error)
   }

}
}
