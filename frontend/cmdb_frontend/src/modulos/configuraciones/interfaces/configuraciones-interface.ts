export interface Configuracion {
    id: number;
    nombre: string;
    fabricante: string;
    tipo: string;
    estatus: string;
    ubicacion: number | null;
}

export interface ConfiguracionAgregar {
    nombre: string;
    fabricante: string;
    tipo: string;
    estatus: string;
    ubicacion: number | null;
}