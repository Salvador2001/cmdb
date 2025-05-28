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

export interface EvaluacionVista {
    id: number,
    incidencia: string,
    responsable: string,
    puntaje: string,
    comentario: string,
    evaluador: string,
    fecha: string
}