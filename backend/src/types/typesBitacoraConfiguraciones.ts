export interface BitacoraConfiguraciones {
    id: number;
    operacion: string;
    fecha: Date;
    configuracion: number;
}

export interface BitacoraConfiguracionesNueva {
    operacion: string;
    fecha: Date;
    configuracion: number;
}