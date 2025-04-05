export interface Configuracion {
    id: number;
    nombre: string;
    fabricante: string;
    tipo: string;
    estatus: string;
    ubicacion: number;
    serial: string;
    fecha_compra: Date;
    rfc: number | null;
}

export interface ConfiguracionNueva {
    nombre: string;
    fabricante: string;
    tipo: string;
    estatus: string;
    ubicacion: number;
    serial: string;
    fecha_compra: Date;
    rfc: number | null;
}