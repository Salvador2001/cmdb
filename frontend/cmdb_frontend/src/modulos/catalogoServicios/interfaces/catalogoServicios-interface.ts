export interface CatalogoServicio {
    id: number;
    nombre: string;
    tiempo_estimado: number;
}

export interface CatalogoServicioAgregar {
    nombre: string;
    tiempo_estimado: string;
}