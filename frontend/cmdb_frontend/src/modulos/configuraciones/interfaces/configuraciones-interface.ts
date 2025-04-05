export interface Configuracion {
    id: number;
    nombre: string;
    fabricante: string;
    tipo: string;
    estatus: string;
    ubicacion: number | null;
    serial: string;
    fecha_compra: Date;
    rfc: number | null;
}

export interface ConfiguracionAgregar {
    nombre: string;
    fabricante: string;
    tipo: string;
    estatus: string;
    ubicacion: number | null;
    serial: string;
    fecha_compra: Date;
    rfc: number | null;
}