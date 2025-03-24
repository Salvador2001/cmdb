import { ref } from "vue"
import type { Componente, ComponenteAgregar } from "../interfaces/componentes-interface"
import componentesApi from "../api/componentesAPI"

export const useComponentes = () => {
    const componentes = ref<Componente[]>([])
    let mensaje = ref(0);

    const traeComponentes = async () => {
        const respuesta = await componentesApi.get<Componente[]>('/')
        componentes.value = respuesta.data
        console.log(componentes.value) //debug
    }

    const traeComponenteId = async (id:number) => {
        const respuesta = await componentesApi.get<Componente[]>('/'+id)
        componentes.value = respuesta.data
    }

    const agregarComponente = async (componente:ComponenteAgregar) => {
        const respuesta = await componentesApi.post('/', componente)
        if (respuesta.data.affectedRows >= 1) {
            console.log("Dato insertado")
            mensaje.value = 1
        }
    }

    const actualizarComponente = async (componente:Componente) => {
        const respuesta = await componentesApi.put('/', componente)
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value = 1
        }
    }

    const borrarComponente = async (componente:Componente) => {
        const respuesta = await componentesApi.delete('/', {data: {id: componente.id}})
        if (respuesta.data.fieldCount == 0) {
            mensaje.value = 1
        }
    }

    return{
        componentes,
        mensaje,
        traeComponentes,
        traeComponenteId,
        agregarComponente,
        actualizarComponente,
        borrarComponente
    }
}