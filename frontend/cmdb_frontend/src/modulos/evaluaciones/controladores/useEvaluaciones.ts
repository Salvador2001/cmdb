import { ref } from "vue";
import type { Evaluacion, EvaluacionAgregar } from "../interfaces/evaluaciones-interface";
import evaluacionesApi from "../api/evaluacionesAPI";

export const useEvaluaciones = () => {
    const evaluaciones = ref<Evaluacion[]>([]);
    let mensaje = ref(0);

    const traeEvaluaciones = async () => {
        const respuesta = await evaluacionesApi.get<Evaluacion[]>('/');
        evaluaciones.value = respuesta.data;
        console.log(evaluaciones.value); // Debug
    };

    const traeEvaluacionId = async (id: number) => {
        const respuesta = await evaluacionesApi.get<Evaluacion[]>('/' + id);
        evaluaciones.value = respuesta.data;
    };

    const agregarEvaluacion = async (evaluacion: EvaluacionAgregar) => {
        const respuesta = await evaluacionesApi.post('/', evaluacion);
        if (respuesta.data.affectedRows >= 1) {
            console.log("Dato insertado");
            mensaje.value = 1;
        }
    };

    const actualizarEvaluacion = async (evaluacion: Evaluacion) => {
        const respuesta = await evaluacionesApi.put('/', evaluacion);
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value = 1;
        }
    };

    const borrarEvaluacion = async (evaluacion: Evaluacion) => {
        const respuesta = await evaluacionesApi.delete('/', { data: { id: evaluacion.id } });
        if (respuesta.data.fieldCount == 0) {
            mensaje.value = 1;
        }
    };

    return {
        evaluaciones,
        mensaje,
        traeEvaluaciones,
        traeEvaluacionId,
        agregarEvaluacion,
        actualizarEvaluacion,
        borrarEvaluacion
    };
};