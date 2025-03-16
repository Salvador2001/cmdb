export interface BitacoraConfiguracion {
    id: number;
    tipo: string;
    fecha: Date;
    configuracion: number;
}

export interface BitacoraConfiguracionNueva {
    tipo: string;
    fecha: Date;
    configuracion: number;
}