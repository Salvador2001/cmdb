import { ref } from "vue"
import serviciosRealizadosApi from "../api/serviciosRealizadosAPI"
import type { ServiciosRealizados } from "../interfaces/serviciosRealizados-interface"

export const useServiciosRealizados = () => {
    const serviciosRealizados = ref<ServiciosRealizados[]>([])
    let mensaje = ref(0);

    const traeServiciosRealizados = async () => {
        const respuesta = await serviciosRealizadosApi.get<ServiciosRealizados[]>('/')
        serviciosRealizados.value = respuesta.data
        console.log(serviciosRealizados.value) //debug
    }

    const traeServiciosRealizadosId = async (id:number) => {
        const respuesta = await serviciosRealizadosApi.get<ServiciosRealizados[]>('/'+id)
        serviciosRealizados.value = respuesta.data
    }

    const agregarServiciosRealizados = async (serviciosRealizados:ServiciosRealizados) => {
        const respuesta = await serviciosRealizadosApi.post('/', serviciosRealizados)
        if (respuesta.data.affectedRows >= 1) {
            console.log("Dato insertado")
            mensaje.value = 1
        }
    }

    const borrarServiciosRealizados = async (serviciosRealizados:ServiciosRealizados) => {
        const respuesta = await serviciosRealizadosApi.delete('/', {data: {servicio_asignado: serviciosRealizados.servicio_asignado, servicio_realizado: serviciosRealizados.servicio_realizado}})
        if (respuesta.data.fieldCount == 0) {
            mensaje.value = 1
        }
    }

    return{
        serviciosRealizados,
        mensaje,
        traeServiciosRealizados,
        traeServiciosRealizadosId,
        agregarServiciosRealizados,
        borrarServiciosRealizados
    }
}