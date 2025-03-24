import { ref } from "vue"
import type { BitacoraComponente, BitacoraComponenteAgregar } from "../interfaces/bitacoraComponentes-interface"
import bitacoraComponentesApi from "../api/bitacoraComponentesAPI"

export const useBitacoraComponentes = () => {
    const bitacoraComponentes = ref<BitacoraComponente[]>([])
    let mensaje = ref(0);

    const traeBitacoraComponentes = async () => {
        const respuesta = await bitacoraComponentesApi.get<BitacoraComponente[]>('/')
        bitacoraComponentes.value = respuesta.data
        console.log(bitacoraComponentes.value) //debug
    }

    const traeBitacoraComponenteId = async (id:number) => {
        const respuesta = await bitacoraComponentesApi.get<BitacoraComponente[]>('/'+id)
        bitacoraComponentes.value = respuesta.data
    }

    const agregarBitacoraComponente = async (bitacoraComponente:BitacoraComponenteAgregar) => {
        const respuesta = await bitacoraComponentesApi.post('/', bitacoraComponente)
        if (respuesta.data.affectedRows >= 1) {
            console.log("Dato insertado")
            mensaje.value = 1
        }
    }

    const actualizarBitacoraComponente = async (bitacoraComponente:BitacoraComponente) => {
        const respuesta = await bitacoraComponentesApi.put('/', bitacoraComponente)
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value = 1
        }
    }

    const borrarBitacoraComponente = async (bitacoraComponente:BitacoraComponente) => {
        const respuesta = await bitacoraComponentesApi.delete('/', {data: {id: bitacoraComponente.id}})
        if (respuesta.data.fieldCount == 0) {
            mensaje.value = 1
        }
    }

    return{
        bitacoraComponentes,
        mensaje,
        traeBitacoraComponentes,
        traeBitacoraComponenteId,
        agregarBitacoraComponente,
        actualizarBitacoraComponente,
        borrarBitacoraComponente
    }
}