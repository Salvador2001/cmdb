export interface BitacoraConfiguracion {
    id: number;
    configuracion: number;
    fecha: string;
    accion: string;
    descripcion: string;
}

export interface BitacoraConfiguracionAgregar {
    configuracion: number;
    fecha: string;
    accion: string;
    descripcion: string;
}