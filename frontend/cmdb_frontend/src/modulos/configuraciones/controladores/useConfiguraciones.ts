import { ref } from "vue"
import type { Configuracion, ConfiguracionAgregar, ConfiguracionConFolioIncidencia } from "../interfaces/configuraciones-interface"
import configuracionesApi from "../api/configuracionesAPI"

export const useConfiguraciones = () => {
    const configuraciones = ref<Configuracion[]>([])
    const configuracionesConServicio = ref<ConfiguracionConFolioIncidencia[]>([])
    let mensaje = ref(0);

    const traeConfiguraciones = async () => {
        const respuesta = await configuracionesApi.get<Configuracion[]>('/')
        configuraciones.value = respuesta.data
        console.log(configuraciones.value) //debug
    }

    const traeConfiguracionesConServicio = async () => {
        const respuesta = await configuracionesApi.get<ConfiguracionConFolioIncidencia[]>('/con-servicio')
        configuracionesConServicio.value = respuesta.data
    }

    const traeConfiguracionesPorDepartamento = async (departamentoId: number) => {
        const respuesta = await configuracionesApi.get<Configuracion[]>('/departamento/'+departamentoId)
        configuraciones.value = respuesta.data
    }

    const traeConfiguracionId = async (id:number) => {
        const respuesta = await configuracionesApi.get<Configuracion[]>('/'+id)
        configuraciones.value = respuesta.data
    }

    const traeConfiguracionPorRFC = async (rfc:number) => {
        const respuesta = await configuracionesApi.get<Configuracion[]>('/rfc/'+rfc)
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
        configuracionesConServicio,
        traeConfiguracionesConServicio,
        mensaje,
        traeConfiguracionPorRFC,
        traeConfiguraciones,
        traeConfiguracionId,
        agregarConfiguracion,
        actualizarConfiguracion,
        borrarConfiguracion,
        traeConfiguracionesPorDepartamento
    }
}