export interface BitacoraIncidencia {
    id: number;
    fecha: string;
    operacion: string;
    incidencia: number;
}

export interface BitacoraIncidenciaNueva {
    fecha: string;
    operacion: string;
    incidencia: number;
}