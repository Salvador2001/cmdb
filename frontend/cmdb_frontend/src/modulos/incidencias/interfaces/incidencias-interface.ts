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
}

export interface IncidenciaAgregar {
    folio: string;
    descripcion: string;
    categoria: string;
    prioridad: string;
    estatus: string;
    fecha_creacion: string;
    autor: number;
    configuracion: number;
    departamento: number;
}

export interface IncidenciaVista {
    id: number;
    folio: string;
    descripcion: string;
    categoria: string;
    prioridad: string;
    estatus: string;
    fecha_creacion: string;
    configuracion: string;
    ubicacion: string;
}