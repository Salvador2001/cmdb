import { ref } from "vue"
import type { Configuracion, ConfiguracionAgregar } from "../interfaces/configuraciones-interface"
import configuracionesApi from "../api/configuracionesAPI"

export const useConfiguraciones = () => {
    const configuraciones = ref<Configuracion[]>([])
    let mensaje = ref(0);

    const traeConfiguraciones = async () => {
        const respuesta = await configuracionesApi.get<Configuracion[]>('/')
        configuraciones.value = respuesta.data
        console.log(configuraciones.value) //debug
    }

    const traeConfiguracionesPorDepartamento = async (departamentoId: number) => {
        const respuesta = await configuracionesApi.get<Configuracion[]>('/departamento/'+departamentoId)
        configuraciones.value = respuesta.data
    }

    const traeConfiguracionId = async (id:number) => {
        const respuesta = await configuracionesApi.get<Configuracion[]>('/'+id)
        configuraciones.value = respuesta.data
    }

    const agregarConfiguracion = async (configuracion:ConfiguracionAgregar) => {
        const respuesta = await configuracionesApi.post('/', configuracion)
        if (respuesta.data.affectedRows >= 1) {
            console.log("Dato insertado")
            mensaje.value = 1
        }
    }

    const actualizarConfiguracion = async (configuracion:Configuracion) => {
        console.log(configuracion)
        if (configuracion.rfc == 0) {
            configuracion.rfc = null
        }
        const respuesta = await configuracionesApi.put('/', configuracion)
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value = 1
        }
    }

    const borrarConfiguracion = async (configuracion:Configuracion) => {
        const respuesta = await configuracionesApi.delete('/', {data: {id: configuracion.id}})
        if (respuesta.data.fieldCount == 0) {
            mensaje.value = 1
        }
    }

    return{
        configuraciones,
        mensaje,
        traeConfiguraciones,
        traeConfiguracionId,
        agregarConfiguracion,
        actualizarConfiguracion,
        borrarConfiguracion,
        traeConfiguracionesPorDepartamento
    }
}