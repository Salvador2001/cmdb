import { ref } from "vue";
import type { BitacoraIncidencia, BitacoraIncidenciaAgregar } from "../interfaces/bitacoraIncidencias-interface";
import bitacoraIncidenciasApi from "../api/bitacoraIncidenciasAPI";

export const useBitacoraIncidencias = () => {
    const bitacoraIncidencias = ref<BitacoraIncidencia[]>([]);
    let mensaje = ref(0);

    const traeBitacoraIncidencias = async () => {
        const respuesta = await bitacoraIncidenciasApi.get<BitacoraIncidencia[]>('/');
        bitacoraIncidencias.value = respuesta.data;
        console.log(bitacoraIncidencias.value); // Debug
    };

    const traeBitacoraIncidenciaId = async (id: number) => {
        const respuesta = await bitacoraIncidenciasApi.get<BitacoraIncidencia[]>('/' + id);
        bitacoraIncidencias.value = respuesta.data;
    };

    const agregarBitacoraIncidencia = async (bitacoraIncidencia: BitacoraIncidenciaAgregar) => {
        const respuesta = await bitacoraIncidenciasApi.post('/', bitacoraIncidencia);
        if (respuesta.data.affectedRows >= 1) {
            console.log("Dato insertado");
            mensaje.value = 1;
        }
    };

    const actualizarBitacoraIncidencia = async (bitacoraIncidencia: BitacoraIncidencia) => {
        const respuesta = await bitacoraIncidenciasApi.put('/', bitacoraIncidencia);
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value = 1;
        }
    };

    const borrarBitacoraIncidencia = async (bitacoraIncidencia: BitacoraIncidencia) => {
        const respuesta = await bitacoraIncidenciasApi.delete('/', { data: { id: bitacoraIncidencia.id } });
        if (respuesta.data.fieldCount == 0) {
            mensaje.value = 1;
        }
    };

    return {
        bitacoraIncidencias,
        mensaje,
        traeBitacoraIncidencias,
        traeBitacoraIncidenciaId,
        agregarBitacoraIncidencia,
        actualizarBitacoraIncidencia,
        borrarBitacoraIncidencia
    };
};