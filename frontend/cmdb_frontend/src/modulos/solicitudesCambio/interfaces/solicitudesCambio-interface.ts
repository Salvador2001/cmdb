export interface SolicitudCambio {
    id: number;
    fecha: string;
    estatus: string;
    requiere_comite: boolean;
    servicio: number;
    folio: string;
}

export interface SolicitudCambioAgregar {
    fecha: string;
    estatus: string;
    requiere_comite: boolean;
    servicio: number;
    folio: string;
}