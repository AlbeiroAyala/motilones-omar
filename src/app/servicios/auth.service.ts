import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginUser } from '../interfaces/pipes/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) {   
    
   }
   
   loginDb( data: LoginUser ){
     return  this.auth.signInWithEmailAndPassword(data.email, data.password);
   }
}
