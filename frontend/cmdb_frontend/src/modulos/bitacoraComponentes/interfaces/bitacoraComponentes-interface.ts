export interface BitacoraComponente {
    id: number;
    componente: number;
    fecha: string;
    accion: string;
    descripcion: string;
}

export interface BitacoraComponenteAgregar {
    componente: number;
    fecha: string;
    accion: string;
    descripcion: string;
}