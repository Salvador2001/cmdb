export interface Evaluacion {
    id: number;
    fecha: Date;
    puntuacion: string;
    comentario: string;
    evaluador: number;
    servicio: number;
}

export interface EvaluacionNueva {
    fecha: Date;
    puntuacion: string;
    comentario: string;
    evaluador: number;
    servicio: number;
}