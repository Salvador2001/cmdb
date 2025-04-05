export interface Evaluacion {
    id: number;
    fecha: string;
    puntuacion: string;
    comentario: string;
    evaluador: number;
    servicio: number;
}

export interface EvaluacionAgregar {
    fecha: string;
    puntuacion: string;
    comentario: string;
    evaluador: number;
    servicio: number;
}