export interface CatalogoServicio {
    id: number;
    nombre: string;
    tiempo_estimado: number;
}

export interface CatalogoServicioNuevo {
    nombre: string;
    tiempo_estimado: string;
}