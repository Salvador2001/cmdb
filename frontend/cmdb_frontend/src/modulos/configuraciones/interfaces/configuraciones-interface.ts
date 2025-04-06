export interface Configuracion {
    id: number;
    nombre: string;
    fabricante: string;
    tipo: string;
    estatus: string;
    ubicacion: number | null;
    serial: string;
    fecha_compra: string;
    rfc: number | null;
}

export interface ConfiguracionAgregar {
    nombre: string;
    fabricante: string;
    tipo: string;
    estatus: string;
    ubicacion: number | null;
    serial: string;
    fecha_compra: string;
    rfc: number | null;
}

export interface ConfiguracionVista {
    id: number,
    nombre: string;
    fabricante: string;
    tipo: string;
    estatus: string;
    ubicacion: string;
    serial: string;
    fecha_compra: string;
    rfc: string; // cambiar a serial luego
}