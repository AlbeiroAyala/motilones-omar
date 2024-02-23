import { User } from "../interfaces/pipes/interfaces";


export class OrmDb {
    
    public createUser (){
         const data: User={
            nombres: 'Omar Contreras',
            email: 'omar@gmail.com',
            uidUser: 'Hgt5BE5YiyLrWQ9Hp2wGiLSLSAI2',
            telefono: '+570000',
            direccionCasa: ' carrera 3',
            tipoUser: 'admin', // admin 0 tecnico
            isActive: true ,// dedfault true = activo
            fechaCreate: Date.now(),// formato en milesegundos
            fechaCumple: 1231723871237128379,
            cedula: 8834364646,
            token: '',
            ultimaVez: Date.now(),
            avatar: ''
         }
         return data
    }
    
}