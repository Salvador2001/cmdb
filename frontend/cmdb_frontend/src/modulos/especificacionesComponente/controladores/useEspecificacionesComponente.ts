import { ref } from "vue"
import type { EspecificacionComponente, EspecificacionComponenteAgregar } from "../interfaces/especificacionesComponente-interface"
import especificacionesComponenteApi from "../api/especificacionesComponenteAPI"

export const useEspecificacionesComponente = () => {
    const especificacionesComponente = ref<EspecificacionComponente[]>([])
    let mensaje = ref(0);

    const traeEspecificacionesComponente = async () => {
        const respuesta = await especificacionesComponenteApi.get<EspecificacionComponente[]>('/')
        especificacionesComponente.value = respuesta.data
        console.log(especificacionesComponente.value) //debug
    }

    const traeEspecificacionComponenteId = async (id:number) => {
        const respuesta = await especificacionesComponenteApi.get<EspecificacionComponente[]>('/'+id)
        especificacionesComponente.value = respuesta.data
    }

    const agregarEspecificacionComponente = async (especificacionComponente:EspecificacionComponenteAgregar) => {
        const respuesta = await especificacionesComponenteApi.post('/', especificacionComponente)
        if (respuesta.data.affectedRows >= 1) {
            console.log("Dato insertado")
            mensaje.value = 1
        }
    }

    const actualizarEspecificacionComponente = async (especificacionComponente:EspecificacionComponente) => {
        const respuesta = await especificacionesComponenteApi.put('/', especificacionComponente)
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value = 1
        }
    }

    const borrarEspecificacionComponente = async (especificacionComponente:EspecificacionComponente) => {
        const respuesta = await especificacionesComponenteApi.delete('/', {data: {id: especificacionComponente.componente, especificacion: especificacionComponente.especificacion}})
        if (respuesta.data.fieldCount == 0) {
            mensaje.value = 1
        }
    }

    return{
        especificacionesComponente,
        mensaje,
        traeEspecificacionesComponente,
        traeEspecificacionComponenteId,
        agregarEspecificacionComponente,
        actualizarEspecificacionComponente,
        borrarEspecificacionComponente
    }
}