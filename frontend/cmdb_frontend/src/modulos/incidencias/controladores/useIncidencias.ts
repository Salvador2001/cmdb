import { ref } from "vue";
import type { Incidencia, IncidenciaAgregar } from "../interfaces/incidencias-interface";
import incidenciasApi from "../api/incidenciasAPI";

export const useIncidencias = () => {
    const incidencias = ref<Incidencia[]>([]);
    let mensaje = ref(0);

    const traeIncidencias = async () => {
        const respuesta = await incidenciasApi.get<Incidencia[]>('/');
        incidencias.value = respuesta.data;
        console.log(incidencias.value); // Debug
    };

    const traeIncidenciasPorDepartamento = async (departamentoId: number) => {
        const respuesta = await incidenciasApi.get<Incidencia[]>('/departamento/' + departamentoId);
        incidencias.value = respuesta.data;
    };

    const traeIncidenciaId = async (id: number) => {
        const respuesta = await incidenciasApi.get<Incidencia[]>('/' + id);
        incidencias.value = respuesta.data;
    };

    const agregarIncidencia = async (incidencia: IncidenciaAgregar) => {
        const respuesta = await incidenciasApi.post('/', incidencia);
        if (respuesta.data.affectedRows >= 1) {
            console.log("Dato insertado");
            mensaje.value = 1;
        }
    };

    const actualizarIncidencia = async (incidencia: Incidencia) => {
        const respuesta = await incidenciasApi.put('/', incidencia);
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value = 1;
        }
    };

    const borrarIncidencia = async (incidencia: Incidencia) => {
        const respuesta = await incidenciasApi.delete('/', { data: { id: incidencia.id } });
        if (respuesta.data.fieldCount == 0) {
            mensaje.value = 1;
        }
    };

    return {
        incidencias,
        mensaje,
        traeIncidencias,
        traeIncidenciaId,
        agregarIncidencia,
        actualizarIncidencia,
        borrarIncidencia,
        traeIncidenciasPorDepartamento
    };
};