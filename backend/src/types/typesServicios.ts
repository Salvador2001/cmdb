export interface Servicio {
    id: number;
    tipo: string;
    incidencia: number;
    responsable: number | null;
}

export interface ServicioNuevo {
    tipo: string;
    incidencia: number;
    responsable: number | null;
}