export interface SolicitudCambio {
    id: number;
    fecha: string;
    estatus: string;
    requiere_comite: boolean;
    servicio: number;
    descripcion: string;
    presupuesto: number;
}

export interface SolicitudCambioAgregar {
    fecha: string;
    estatus: string;
    requiere_comite: boolean;
    servicio: number;
    descripcion: string;
    presupuesto: number;
}

export interface SolicitudCambioVista {
    id: number;
    incidencia: string;
    descripcion: string;
    estatus: string;
    presupuesto: number;
    configuracion: string;
    fecha: string;
    requiere_comite: boolean;
    ubicacion: string;
}