export interface Componente {
    id: number;
    nombre: string;
    fabricante: string;
    tipo: string;
    estatus: string;
    configuracion: number | null;
}

export interface ComponenteNuevo {
    nombre: string;
    fabricante: string;
    tipo: string;
    estatus: string;
    configuracion: number | null;
}