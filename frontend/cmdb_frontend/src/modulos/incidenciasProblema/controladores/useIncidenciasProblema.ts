import { ref } from "vue";
import type { IncidenciaProblema } from "../interfaces/incidenciasProblema-interface";
import incidenciasProblemaApi from "../api/incidenciasProblemaAPI";

export const useIncidenciasProblema = () => {
    const incidenciasProblema = ref<IncidenciaProblema[]>([]);
    let mensaje = ref(0);

    const traeIncidenciasProblema = async () => {
        const respuesta = await incidenciasProblemaApi.get<IncidenciaProblema[]>('/');
        incidenciasProblema.value = respuesta.data;
    };

    const traeIncidenciasProblemaId = async (id: number) => {
        const respuesta = await incidenciasProblemaApi.get<IncidenciaProblema[]>('/' + id);
        incidenciasProblema.value = respuesta.data;
    };

    const agregarIncidenciaProblema = async (incidenciaProblema: IncidenciaProblema) => {
        const respuesta = await incidenciasProblemaApi.post('/', incidenciaProblema);
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value = 1;
        }
    };

    const borrarIncidenciaProblema = async (incidencia: number, problema: number) => {
        const respuesta = await incidenciasProblemaApi.delete('/', { data: { incidencia, problema } });
        if (respuesta.data.fieldCount == 0) {
            mensaje.value = 1;
        }
    };

    return {
        incidenciasProblema,
        mensaje,
        traeIncidenciasProblema,
        agregarIncidenciaProblema,
        traeIncidenciasProblemaId,
        borrarIncidenciaProblema
    };
};