export interface Configuracion {
    id: number;
    nombre: string;
    fabricante: string;
    tipo: string;
    estatus: string;
    ubicacion: number;
}

export interface ConfiguracionNueva {
    nombre: string;
    fabricante: string;
    tipo: string;
    estatus: string;
    ubicacion: number;
}