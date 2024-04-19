export interface loginAuth{
    email: string;
    password: string
}

export interface User{
    nombres: string;
    email: string;
    uidUser: string;
    telefono: string;
    direccionCasa: string;
    tipoUser: string; // admin 0 tecnico
    isActive: boolean; // dedfault true = activo
    fechaCreate: number // formato en milesegundos
    fechaCumple: number;
    cedula: number;
    token: string;
    ultimaVez: number;
    avatar: string;
    profesion: string; // ingeniro , tecnico
    userDelete?: boolean; // true = activo, false= eliminado del sistema
}

export interface Categoria{
     nombreCategoria: string;
     isActive: boolean; // defaul true
     uid: string;
     fechaCreate: number;
}