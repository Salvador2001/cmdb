import { ref } from "vue";
import type { Problema, ProblemaAgregar } from "../interfaces/problemas-interface";
import problemasApi from "../api/problemasAPI";

export const useProblemas = () => {
    const problemas = ref<Problema[]>([]);
    let mensaje = ref(0);

    const traeProblemas = async () => {
        const respuesta = await problemasApi.get<Problema[]>('/');
        problemas.value = respuesta.data;
        console.log(problemas.value); // Debug
    };

    const traeProblemaId = async (id: number) => {
        const respuesta = await problemasApi.get<Problema[]>('/' + id);
        problemas.value = respuesta.data;
    };

    const agregarProblema = async (problema: ProblemaAgregar) => {
        const respuesta = await problemasApi.post('/', problema);
        if (respuesta.data.affectedRows >= 1) {
            console.log("Dato insertado");
            mensaje.value = 1;
        }
    };

    const actualizarProblema = async (problema: Problema) => {
        const respuesta = await problemasApi.put('/', problema);
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value = 1;
        }
    };

    const borrarProblema = async (problema: Problema) => {
        const respuesta = await problemasApi.delete('/', { data: { id: problema.id } });
        if (respuesta.data.fieldCount == 0) {
            mensaje.value = 1;
        }
    };

    return {
        problemas,
        mensaje,
        traeProblemas,
        traeProblemaId,
        agregarProblema,
        actualizarProblema,
        borrarProblema
    };
};