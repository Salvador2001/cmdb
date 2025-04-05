import { ref } from "vue";
import type { SolicitudCambio, SolicitudCambioAgregar } from "../interfaces/solicitudesCambio-interface";
import solicitudesCambioApi from "../api/solicitudesCambioAPI";

export const useSolicitudesCambio = () => {
    const solicitudesCambio = ref<SolicitudCambio[]>([]);
    let mensaje = ref(0);

    const traeSolicitudesCambio = async () => {
        const respuesta = await solicitudesCambioApi.get<SolicitudCambio[]>('/');
        solicitudesCambio.value = respuesta.data;
        console.log(solicitudesCambio.value); // Debug
    };

    const traeSolicitudCambioId = async (id: number) => {
        const respuesta = await solicitudesCambioApi.get<SolicitudCambio[]>('/' + id);
        solicitudesCambio.value = respuesta.data;
    };

    const agregarSolicitudCambio = async (solicitudCambio: SolicitudCambioAgregar) => {
        const respuesta = await solicitudesCambioApi.post('/', solicitudCambio);
        if (respuesta.data.affectedRows >= 1) {
            console.log("Dato insertado");
            mensaje.value = 1;
        }
    };

    const actualizarSolicitudCambio = async (solicitudCambio: SolicitudCambio) => {
        const respuesta = await solicitudesCambioApi.put('/', solicitudCambio);
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value = 1;
        }
    };

    const borrarSolicitudCambio = async (solicitudCambio: SolicitudCambio) => {
        const respuesta = await solicitudesCambioApi.delete('/', { data: { id: solicitudCambio.id } });
        if (respuesta.data.fieldCount == 0) {
            mensaje.value = 1;
        }
    };

    return {
        solicitudesCambio,
        mensaje,
        traeSolicitudesCambio,
        traeSolicitudCambioId,
        agregarSolicitudCambio,
        actualizarSolicitudCambio,
        borrarSolicitudCambio
    };
};