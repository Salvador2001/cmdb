import { ref } from "vue"
import type { Ubicacion, UbicacionAgregar } from "../interfaces/ubicacion-interface"
import ubicacionApi from "../api/ubicacionAPI"

export const useUbicacion = () => {
    const ubicaciones = ref<Ubicacion[]>([])
    let mensaje = ref(0);

    const traeUbicaciones = async () => {
        const respuesta = await ubicacionApi.get<Ubicacion[]>('/')
        ubicaciones.value = respuesta.data
        console.log(ubicaciones.value) //debug
    }

    const traeUbicacionId = async (id:number) => {
        const respuesta = await ubicacionApi.get<Ubicacion[]>('/'+id)
        ubicaciones.value = respuesta.data
    }

    const agregarUbicacion = async (ubicacion:UbicacionAgregar) => {
        const respuesta = await ubicacionApi.post('/', ubicacion)
        if (respuesta.data.affectedRows >= 1) {
            console.log("Dato insertado")
            mensaje.value = 1
        }
    }

    const actualizarUbicacion = async (ubicacion:Ubicacion) => {
        const respuesta = await ubicacionApi.put('/', ubicacion)
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value = 1
        }
    }

    const borrarUbicacion = async (ubicacion:Ubicacion) => {
        const respuesta = await ubicacionApi.delete('/', {data: {id: ubicacion.id}})
        if (respuesta.data.fieldCount == 0) {
            mensaje.value = 1
        }
    }

    return{
        ubicaciones,
        mensaje,
        traeUbicaciones,
        traeUbicacionId,
        agregarUbicacion,
        actualizarUbicacion,
        borrarUbicacion
    }
}