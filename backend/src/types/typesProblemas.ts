export interface Problema {
    id: number;
    folio: string;
    error_conocido: string;
    causa_raiz: string;
    solucion: string;
    prioridad: string;
    estatus: string;
    fecha_creacion: string;
    autor: number;
    departamento: number;
    responsable: number | null;
}

export interface ProblemaNuevo {
    folio: string;
    error_conocido: string;
    causa_raiz: string;
    solucion: string;
    prioridad: string;
    estatus: string;
    fecha_creacion: string;
    autor: number;
    departamento: number;
    responsable: number | null;
}