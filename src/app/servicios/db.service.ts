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
  getUsersAll(nameCollection: string, limte : number ){
     return this.db.collection( nameCollection, ref=>( ref.where('userDelete','==',true).limit(limte).orderBy('fechaCreate','desc')) ).get();
  }

  updateDocForOneParamBoolen(nameCollection: string,uid: string, param: boolean){
     return  this.db.collection(nameCollection).doc(uid).update({
      isActive : param
     })
   }

   deleteUser(nameCollection: string,  user: User){
    return  this.db.collection(nameCollection).doc(user.uidUser).update({
      userDelete : false
     })
   }
   updateDocUser(nameCollection: string,uid: string, data: any){
    return  this.db.collection(nameCollection).doc(uid).update(
      data
    )
  }

  getCollection(nameCollection: string){
     return  this.db.collection(nameCollection).get()
  }

  createDocument(nameCollection: string, data: any){
      return this.db.collection(nameCollection).doc(data.uid).set(data);
  }
}
