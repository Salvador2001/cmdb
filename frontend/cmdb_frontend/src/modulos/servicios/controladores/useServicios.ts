import { ref } from "vue";
import type { Servicio, ServicioAgregar } from "../interfaces/servicios-interface";
import serviciosApi from "../api/serviciosAPI";

export const useServicios = () => {
    const servicios = ref<Servicio[]>([]);
    let mensaje = ref(0);

    const traeServicios = async () => {
        const respuesta = await serviciosApi.get<Servicio[]>('/');
        servicios.value = respuesta.data;
        console.log(servicios.value); // Debug
    };

    const traeServicioId = async (id: number) => {
        const respuesta = await serviciosApi.get<Servicio[]>('/' + id);
        servicios.value = respuesta.data;
    };

    const traeServicioIncidencia = async (id: number) => {
        const respuesta = await serviciosApi.get<Servicio[]>('/incidencia/' + id);
        servicios.value = respuesta.data;
    };

    const traeServicioFolioIncidencia = async (folio: string) => {
        const respuesta = await serviciosApi.get<Servicio[]>('/folio-incidencia/' + folio);
        servicios.value = respuesta.data;
    };

    const traeServicioResponsable = async (id: number) => {
        const respuesta = await serviciosApi.get<Servicio[]>('/responsable/' + id);
        servicios.value = respuesta.data;
    };

    const agregarServicio = async (servicio: ServicioAgregar) => {
        const respuesta = await serviciosApi.post('/', servicio);
        if (respuesta.data.affectedRows >= 1) {
            console.log("Dato insertado");
            mensaje.value = 2;
        }
    };

    const actualizarServicio = async (servicio: Servicio) => {
        const respuesta = await serviciosApi.put('/', servicio);
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value = 2;
        }
    };

    const borrarServicio = async (servicio: Servicio) => {
        const respuesta = await serviciosApi.delete('/', { data: { id: servicio.id } });
        if (respuesta.data.fieldCount == 0) {
            mensaje.value = 2;
        }
    };

    return {
        servicios,
        mensaje,
        traeServicios,
        traeServicioId,
        traeServicioFolioIncidencia,
        traeServicioIncidencia,
        traeServicioResponsable,
        agregarServicio,
        actualizarServicio,
        borrarServicio
    };
};