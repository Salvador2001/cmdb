export interface BitacoraSoftware {
    id: number;
    software: number;
    fecha: string;
    accion: string;
    descripcion: string;
}

export interface BitacoraSoftwareAgregar {
    software: number;
    fecha: string;
    accion: string;
    descripcion: string;
}