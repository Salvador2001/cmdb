export interface Incidencia {
    id: number;
    folio: string;
    descripcion: string;
    categoria: string;
    prioridad: string;
    estatus: string;
    fecha_creacion: string;
    autor: number;
    configuracion: number;
    departamento: number;
    fecha_resolucion: string | null;
}

export interface IncidenciaNueva {
    folio: string;
    descripcion: string;
    categoria: string;
    prioridad: string;
    estatus: string;
    fecha_creacion: string;
    autor: number;
    configuracion: number;
    departamento: number;
    fecha_resolucion: string | null;
}