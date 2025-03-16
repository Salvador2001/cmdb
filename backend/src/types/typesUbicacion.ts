export interface Ubicacion {
    id: number;
    nombre: string;
    tipo: string;
    edificio: string;
    departamento: number;
}

export interface UbicacionNueva {
    nombre: string;
    tipo: string;
    edificio: string;
    departamento: number;
}