export interface BitacoraIncidencia {
    id: number;
    fecha: Date;
    operacion: string;
    incidencia: number;
}

export interface BitacoraIncidenciaNueva {
    fecha: Date;
    operacion: string;
    incidencia: number;
}