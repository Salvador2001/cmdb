import { ref } from "vue"
import type { EspecificacionConfiguracion, EspecificacionConfiguracionAgregar } from "../interfaces/especificacionesConfiguracion-interface"
import especificacionesConfiguracionApi from "../api/especificacionesConfiguracionAPI"

export const useEspecificacionesConfiguracion = () => {
    const especificacionesConfiguracion = ref<EspecificacionConfiguracion[]>([])
    let mensaje = ref(0);

    const traeEspecificacionesConfiguracion = async () => {
        const respuesta = await especificacionesConfiguracionApi.get<EspecificacionConfiguracion[]>('/')
        especificacionesConfiguracion.value = respuesta.data
        console.log(especificacionesConfiguracion.value) //debug
    }

    const traeEspecificacionConfiguracionId = async (id:number) => {
        const respuesta = await especificacionesConfiguracionApi.get<EspecificacionConfiguracion[]>('/'+id)
        especificacionesConfiguracion.value = respuesta.data
    }

    const agregarEspecificacionConfiguracion = async (especificacionConfiguracion:EspecificacionConfiguracionAgregar) => {
        const respuesta = await especificacionesConfiguracionApi.post('/', especificacionConfiguracion)
        if (respuesta.data.affectedRows >= 1) {
            console.log("Dato insertado")
            mensaje.value = 1
        }
    }

    const actualizarEspecificacionConfiguracion = async (especificacionConfiguracion:EspecificacionConfiguracion) => {
        const respuesta = await especificacionesConfiguracionApi.put('/', especificacionConfiguracion)
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value = 1
        }
    }

    const borrarEspecificacionConfiguracion = async (especificacionConfiguracion:EspecificacionConfiguracion) => {
        const respuesta = await especificacionesConfiguracionApi.delete('/', {data: {id: especificacionConfiguracion.configuracion, especificacion: especificacionConfiguracion.especificacion}})
        if (respuesta.data.fieldCount == 0) {
            mensaje.value = 1
        }
    }

    return{
        especificacionesConfiguracion,
        mensaje,
        traeEspecificacionesConfiguracion,
        traeEspecificacionConfiguracionId,
        agregarEspecificacionConfiguracion,
        actualizarEspecificacionConfiguracion,
        borrarEspecificacionConfiguracion
    }
}