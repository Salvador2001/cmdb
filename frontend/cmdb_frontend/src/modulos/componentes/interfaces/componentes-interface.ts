export interface Componente {
    id: number;
    nombre: string;
    fabricante: string;
    tipo: string;
    estatus: string;
    configuracion: number | null;
}

export interface ComponenteAgregar {
    nombre: string;
    fabricante: string;
    tipo: string;
    estatus: string;
    configuracion: number | null;
}