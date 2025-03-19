export interface BitacoraSoftware {
    id: number;
    operacion: string;
    fecha: Date;
    configuracion: number;
    software: number;
}

export interface BitacoraSoftwareNueva {
    operacion: string;
    fecha: Date;
    configuracion: number;
    software: number;
}