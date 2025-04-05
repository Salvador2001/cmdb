export interface Ubicacion {
    id: number;
    nombre: string;
    tipo: string;
    edificio: string;
    departamento: number;
    responsable: string;
}

export interface UbicacionAgregar {
    nombre: string;
    tipo: string;
    edificio: string;
    departamento: number;
    responsable: string;
}