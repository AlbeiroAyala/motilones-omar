import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../interfaces/pipes/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private db:  AngularFirestore) { }

  createUserDb(user: User){
    return this.db.collection('app_users').doc(user.uidUser).set(user)
  }

  getUser(uid: string){
   return this.db.collection('app_users').doc(uid).get();
  }
  getUserValueChanges(nameCollection: string, uid: string){
     return this.db.collection(nameCollection).doc(uid).valueChanges();
  }
}
