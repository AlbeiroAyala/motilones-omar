import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { loginAuth } from '../interfaces/pipes/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) {
    }

    async curretnUser(){
       return await  this.auth.currentUser
    }

   loginDb( data: loginAuth ){
     return  this.auth.signInWithEmailAndPassword(data.email, data.password);
   }

   createUserAuth(data: loginAuth){
      return   this.auth.createUserWithEmailAndPassword(data.email, data.password)
   }
   sendEmailChangePass(email?: string | undefined | null){
    if(!email){
      return
    }
     return this.auth.sendPasswordResetEmail(email)
   }

   stateUser(){
    return  this.auth.authState
   }

  async logout(){
     return  await this.auth.signOut();
   }
}
