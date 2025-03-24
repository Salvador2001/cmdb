import { ref } from "vue"
import type { BitacoraSoftware, BitacoraSoftwareAgregar } from "../interfaces/bitacoraSoftware-interface"
import bitacoraSoftwareApi from "../api/bitacoraSoftwareAPI"

export const useBitacoraSoftware = () => {
    const bitacoraSoftware = ref<BitacoraSoftware[]>([])
    let mensaje = ref(0);

    const traeBitacoraSoftware = async () => {
        const respuesta = await bitacoraSoftwareApi.get<BitacoraSoftware[]>('/')
        bitacoraSoftware.value = respuesta.data
        console.log(bitacoraSoftware.value) //debug
    }

    const traeBitacoraSoftwareId = async (id:number) => {
        const respuesta = await bitacoraSoftwareApi.get<BitacoraSoftware[]>('/'+id)
        bitacoraSoftware.value = respuesta.data
    }

    const agregarBitacoraSoftware = async (bitacoraSoftware:BitacoraSoftwareAgregar) => {
        const respuesta = await bitacoraSoftwareApi.post('/', bitacoraSoftware)
        if (respuesta.data.affectedRows >= 1) {
            console.log("Dato insertado")
            mensaje.value = 1
        }
    }

    const actualizarBitacoraSoftware = async (bitacoraSoftware:BitacoraSoftware) => {
        const respuesta = await bitacoraSoftwareApi.put('/', bitacoraSoftware)
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value = 1
        }
    }

    const borrarBitacoraSoftware = async (bitacoraSoftware:BitacoraSoftware) => {
        const respuesta = await bitacoraSoftwareApi.delete('/', {data: {id: bitacoraSoftware.id}})
        if (respuesta.data.fieldCount == 0) {
            mensaje.value = 1
        }
    }

    return{
        bitacoraSoftware,
        mensaje,
        traeBitacoraSoftware,
        traeBitacoraSoftwareId,
        agregarBitacoraSoftware,
        actualizarBitacoraSoftware,
        borrarBitacoraSoftware
    }
}