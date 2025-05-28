export interface Servicio {
    id: number;
    tipo: string;
    incidencia: number;
    responsable: number | null;
    diagnostico: string | null;
    fecha_asignacion: string | null;
}

export interface ServicioNuevo {
    tipo: string;
    incidencia: number;
    responsable: number | null;
    diagnostico: string | null;
    fecha_asignacion: string | null;
}