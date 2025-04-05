export interface Incidencia {
    id: number;
    folio: string;
    descripcion: string;
    categoria: string;
    prioridad: string;
    estatus: string;
    fecha_creacion: Date;
    autor: number;
    configuracion: number;
    departamento: number;
}

export interface IncidenciaNueva {
    folio: string;
    descripcion: string;
    categoria: string;
    prioridad: string;
    estatus: string;
    fecha_creacion: Date;
    autor: number;
    configuracion: number;
    departamento: number;
}