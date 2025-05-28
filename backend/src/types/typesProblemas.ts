export interface Problema {
    id: number;
    folio: string;
    error_conocido: string;
    causa_raiz: string;
    solucion: string;
    estatus: string;
    fecha_creacion: string;
    autor: number;
    departamento: number;
    responsable: number | null;
    fecha_resolucion: string | null;
    descripcion: string;
    fecha_asignacion: string | null;
}

export interface ProblemaNuevo {
    folio: string;
    error_conocido: string;
    causa_raiz: string;
    solucion: string;
    estatus: string;
    fecha_creacion: string;
    autor: number;
    departamento: number;
    responsable: number | null;
    fecha_resolucion: string | null;
    descripcion: string;
    fecha_asignacion: string | null;
}