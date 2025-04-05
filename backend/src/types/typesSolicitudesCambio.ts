export interface SolicitudCambio {
    id: number;
    fecha: Date;
    estatus: string;
    requiere_comite: boolean;
    servicio: number;
    folio: string;
}

export interface SolicitudCambioNueva {
    fecha: Date;
    estatus: string;
    requiere_comite: boolean;
    servicio: number;
    folio: string;
}