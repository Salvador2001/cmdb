export interface Usuario {
    id: number;
    nombre: string;
    rol: number;
    departamento: number;
}

export interface UsuarioNuevo {
    nombre: string;
    rol: number;
    departamento: number;
}