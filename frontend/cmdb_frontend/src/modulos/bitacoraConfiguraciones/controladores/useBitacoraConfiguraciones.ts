import { ref } from "vue"
import type { BitacoraConfiguracion, BitacoraConfiguracionAgregar } from "../interfaces/bitacoraConfiguraciones-interface"
import bitacoraConfiguracionesApi from "../api/bitacoraConfiguracionesAPI"

export const useBitacoraConfiguraciones = () => {
    const bitacoraConfiguraciones = ref<BitacoraConfiguracion[]>([])
    let mensaje = ref(0);

    const traeBitacoraConfiguraciones = async () => {
        const respuesta = await bitacoraConfiguracionesApi.get<BitacoraConfiguracion[]>('/')
        bitacoraConfiguraciones.value = respuesta.data
        console.log(bitacoraConfiguraciones.value) //debug
    }

    const traeBitacoraConfiguracionId = async (id:number) => {
        const respuesta = await bitacoraConfiguracionesApi.get<BitacoraConfiguracion[]>('/'+id)
        bitacoraConfiguraciones.value = respuesta.data
    }

    const agregarBitacoraConfiguracion = async (bitacoraConfiguracion:BitacoraConfiguracionAgregar) => {
        const respuesta = await bitacoraConfiguracionesApi.post('/', bitacoraConfiguracion)
        if (respuesta.data.affectedRows >= 1) {
            console.log("Dato insertado")
            mensaje.value = 1
        }
    }

    const actualizarBitacoraConfiguracion = async (bitacoraConfiguracion:BitacoraConfiguracion) => {
        const respuesta = await bitacoraConfiguracionesApi.put('/', bitacoraConfiguracion)
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value = 1
        }
    }

    const borrarBitacoraConfiguracion = async (bitacoraConfiguracion:BitacoraConfiguracion) => {
        const respuesta = await bitacoraConfiguracionesApi.delete('/', {data: {id: bitacoraConfiguracion.id}})
        if (respuesta.data.fieldCount == 0) {
            mensaje.value = 1
        }
    }

    return{
        bitacoraConfiguraciones,
        mensaje,
        traeBitacoraConfiguraciones,
        traeBitacoraConfiguracionId,
        agregarBitacoraConfiguracion,
        actualizarBitacoraConfiguracion,
        borrarBitacoraConfiguracion
    }
}