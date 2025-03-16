export interface Usuario {
    id: number;
    nombre: string;
    correo: string;
    rol: number;
    departamento: number;
}

export interface UsuarioNuevo {
    nombre: string;
    correo: string;
    rol: number;
    departamento: number;
}