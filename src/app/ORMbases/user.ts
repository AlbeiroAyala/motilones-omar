import { User } from "../interfaces/pipes/interfaces";


export class OrmDb {

    public createUser (email: string, uid: string){
         const data: User={
            nombres: '',
            email: email,
            uidUser: uid,
            telefono: '',
            direccionCasa: '',
            tipoUser: 'tecnico', // admin 0 tecnico
            isActive: false ,// dedfault true = activo
            fechaCreate: Date.now(),// formato en milesegundos
            fechaCumple: 0,
            cedula: 0,
            token: '',
            ultimaVez: Date.now(),
            avatar: '',
            profesion: '',
            userDelete: true

         }
         return data
    }


}