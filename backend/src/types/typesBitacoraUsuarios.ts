export interface BitacoraUsuario {
    id: number;
    fecha: Date;
    operacion: string;
    usuario: number;
}

export interface BitacoraUsuarioNueva {
    fecha: Date;
    operacion: string;
    usuario: number;
}