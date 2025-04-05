export interface BitacoraIncidencia {
    id: number;
    fecha: string;
    operacion: string;
    incidencia: number;
}

export interface BitacoraIncidenciaAgregar {
    fecha: string;
    operacion: string;
    incidencia: number;
}