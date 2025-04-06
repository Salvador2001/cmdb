export interface Evaluacion {
    id: number;
    fecha: string;
    puntuacion: string;
    comentario: string;
    evaluador: number;
    servicio: number;
}

export interface EvaluacionNueva {
    fecha: string;
    puntuacion: string;
    comentario: string;
    evaluador: number;
    servicio: number;
}