import { ref } from "vue"
import type { Especificacion, EspecificacionAgregar } from "../interfaces/especificaciones-interface"
import especificacionesApi from "../api/especificacionesAPI"

export const useEspecificaciones = () => {
    const especificaciones = ref<Especificacion[]>([])
    let mensaje = ref(0);

    const traeEspecificaciones = async () => {
        const respuesta = await especificacionesApi.get<Especificacion[]>('/')
        especificaciones.value = respuesta.data
        console.log(especificaciones.value) //debug
    }

    const traeEspecificacionId = async (id:number) => {
        const respuesta = await especificacionesApi.get<Especificacion[]>('/'+id)
        especificaciones.value = respuesta.data
    }

    const agregarEspecificacion = async (especificacion:EspecificacionAgregar) => {
        const respuesta = await especificacionesApi.post('/', especificacion)
        if (respuesta.data.affectedRows >= 1) {
            console.log("Dato insertado")
            mensaje.value = 1
        }
    }

    const actualizarEspecificacion = async (especificacion:Especificacion) => {
        const respuesta = await especificacionesApi.put('/', especificacion)
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value = 1
        }
    }

    const borrarEspecificacion = async (especificacion:Especificacion) => {
        const respuesta = await especificacionesApi.delete('/', {data: {id: especificacion.id}})
        if (respuesta.data.fieldCount == 0) {
            mensaje.value = 1
        }
    }

    return{
        especificaciones,
        mensaje,
        traeEspecificaciones,
        traeEspecificacionId,
        agregarEspecificacion,
        actualizarEspecificacion,
        borrarEspecificacion
    }
}