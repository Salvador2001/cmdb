import { ref } from "vue"
import type { Software, SoftwareAgregar } from "../interfaces/software-interface"
import softwareApi from "../api/softwareAPI"

export const useSoftware = () => {
    const software = ref<Software[]>([])
    let mensaje = ref(0);

    const traeSoftware = async () => {
        const respuesta = await softwareApi.get<Software[]>('/')
        software.value = respuesta.data
        console.log(software.value) //debug
    }

    const traeSoftwareId = async (id:number) => {
        const respuesta = await softwareApi.get<Software[]>('/'+id)
        software.value = respuesta.data
    }

    const agregarSoftware = async (software:SoftwareAgregar) => {
        const respuesta = await softwareApi.post('/', software)
        if (respuesta.data.affectedRows >= 1) {
            console.log("Dato insertado")
            mensaje.value = 1
        }
    }

    const actualizarSoftware = async (software:Software) => {
        const respuesta = await softwareApi.put('/', software)
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value = 1
        }
    }

    const borrarSoftware = async (software:Software) => {
        const respuesta = await softwareApi.delete('/', {data: {id: software.id}})
        if (respuesta.data.fieldCount == 0) {
            mensaje.value = 1
        }
    }

    return{
        software,
        mensaje,
        traeSoftware,
        traeSoftwareId,
        agregarSoftware,
        actualizarSoftware,
        borrarSoftware
    }
}