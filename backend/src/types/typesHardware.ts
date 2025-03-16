export interface Hardware {
    id: number;
    nombre: string;
    fabricante: string;
    tipo: string;
    estatus: string;
    configuracion: number | null;
}

export interface HardwareNuevo {
    nombre: string;
    fabricante: string;
    tipo: string;
    estatus: string;
    configuracion: number | null;
}