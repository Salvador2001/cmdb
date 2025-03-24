export interface Usuario {
    id: number;
    nombre: string;
    rol: number;
    departamento: number;
}

export interface UsuarioAgregar {
    nombre: string;
    rol: number;
    departamento: number;
}