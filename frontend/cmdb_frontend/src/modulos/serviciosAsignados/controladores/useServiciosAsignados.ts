import { ref } from "vue";
import type { ServicioAsignado, ServicioAsignadoAgregar } from "../interfaces/serviciosAsignados-interface";
import serviciosAsignadosApi from "../api/serviciosAsignadosAPI";

export const useServiciosAsignados = () => {
    const serviciosAsignados = ref<ServicioAsignado[]>([]);
    let mensaje = ref(0);

    const traeServiciosAsignados = async () => {
        const respuesta = await serviciosAsignadosApi.get<ServicioAsignado[]>('/');
        serviciosAsignados.value = respuesta.data;
        console.log(serviciosAsignados.value); // Debug
    };

    const traeServicioAsignado = async (servicio: number, responsable: number) => {
        const respuesta = await serviciosAsignadosApi.get<ServicioAsignado[]>('/'+ servicio + '/' + responsable);
        serviciosAsignados.value = respuesta.data;
    };

    const agregarServicioAsignado = async (servicioAsignado: ServicioAsignadoAgregar) => {
        const respuesta = await serviciosAsignadosApi.post('/', servicioAsignado);
        if (respuesta.data.affectedRows >= 1) {
            console.log("Dato insertado");
            mensaje.value = 1;
        }
    };

    const borrarServicioAsignado = async (servicio: number, responsable: number) => {
        const respuesta = await serviciosAsignadosApi.delete('/', { data: { servicio, responsable } });
        if (respuesta.data.fieldCount == 0) {
            mensaje.value = 1;
        }
    };

    return {
        serviciosAsignados,
        mensaje,
        traeServiciosAsignados,
        traeServicioAsignado,
        agregarServicioAsignado,
        borrarServicioAsignado
    };
};