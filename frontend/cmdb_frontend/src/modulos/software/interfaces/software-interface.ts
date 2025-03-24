export interface Software {
    id: number;
    nombre: string;
    desarrollador: string;
    tipo: string;
    licencia: string;
    version: string;
    descripcion: string;
}

export interface SoftwareAgregar {
    nombre: string;
    desarrollador: string;
    tipo: string;
    licencia: string;
    version: string;
    descripcion: string;
}