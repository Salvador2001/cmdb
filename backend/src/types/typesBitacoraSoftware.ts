export interface BitacoraSoftware {
    id: number;
    tipo: string;
    fecha: Date;
    configuracion: number;
    software: number;
}

export interface BitacoraSoftwareNueva {
    tipo: string;
    fecha: Date;
    configuracion: number;
    software: number;
}