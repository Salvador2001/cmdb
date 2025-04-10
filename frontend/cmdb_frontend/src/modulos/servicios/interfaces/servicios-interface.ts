export interface Servicio {
    id: number;
    tipo: string;
    incidencia: number;
    responsable: number | null;
}

export interface ServicioAgregar {
    tipo: string;
    incidencia: number;
    responsable: number | null;
}