import { ref } from "vue"
import type { ConjuntoSoftware, ConjuntoSoftwareAgregar } from "../interfaces/conjuntoSoftware-interface"
import type { Software } from "../../software/interfaces/software-interface"
import conjuntoSoftwareApi from "../api/conjuntoSoftwareAPI"

export const useConjuntoSoftware = () => {
    const conjuntoSoftware = ref<ConjuntoSoftware[]>([])
    const listaSoftware = ref<Software[]>([])
    let mensaje = ref(0);

    const traeConjuntoSoftware = async () => {
        const respuesta = await conjuntoSoftwareApi.get<ConjuntoSoftware[]>('/')
        conjuntoSoftware.value = respuesta.data
        console.log(conjuntoSoftware.value) //debug
    }

    const traeListaConjuntoSoftware = async (configuracion:number) => {
        const respuesta = await conjuntoSoftwareApi.get<Software[]>('/'+configuracion)
        listaSoftware.value = respuesta.data
    }

    const traeConjuntoSoftwareId = async (id:number) => {
        const respuesta = await conjuntoSoftwareApi.get<ConjuntoSoftware[]>('/'+id)
        conjuntoSoftware.value = respuesta.data
    }

    const agregarConjuntoSoftware = async (conjuntoSoftware:ConjuntoSoftwareAgregar) => {
        const respuesta = await conjuntoSoftwareApi.post('/', conjuntoSoftware)
        if (respuesta.data.affectedRows >= 1) {
            console.log("Dato insertado")
            mensaje.value = 1
        }
    }

    const actualizarConjuntoSoftware = async (conjuntoSoftware:ConjuntoSoftware) => {
        const respuesta = await conjuntoSoftwareApi.put('/', conjuntoSoftware)
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value = 1
        }
    }

    const borrarConjuntoSoftware = async (conjuntoSoftware:ConjuntoSoftware) => {
        const respuesta = await conjuntoSoftwareApi.delete('/', {data: {id: conjuntoSoftware.configuracion, software: conjuntoSoftware.software}})
        if (respuesta.data.fieldCount == 0) {
            mensaje.value = 1
        }
    }

    return{
        conjuntoSoftware,
        mensaje,
        traeConjuntoSoftware,
        listaSoftware,
        traeListaConjuntoSoftware,
        traeConjuntoSoftwareId,
        agregarConjuntoSoftware,
        actualizarConjuntoSoftware,
        borrarConjuntoSoftware
    }
}