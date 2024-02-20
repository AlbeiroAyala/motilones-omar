import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { loginAuth } from '../interfaces/pipes/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) {   
    
   }
   
   loginDb( data: loginAuth ){
     return  this.auth.signInWithEmailAndPassword(data.email, data.password);
   }
   
  async logout(){
     return  await this.auth.signOut();
   }
}
