import { ref } from "vue"
import type { Credencial, CredencialAgregar } from "../interfaces/credenciales-interface"
import credencialesApi from "../api/credencialesAPI"

export const useCredenciales = () => {
    const credenciales = ref<Credencial[]>([])
    let mensaje = ref(0);

    const traeCredenciales = async () => {
        const respuesta = await credencialesApi.get<Credencial[]>('/')
        credenciales.value = respuesta.data
        console.log(credenciales.value) //debug
    }

    const traeCredencialId = async (id:number) => {
        const respuesta = await credencialesApi.get<Credencial[]>('/'+id)
        credenciales.value = respuesta.data
    }

    const traeCredencialPorCorreo = async (correo:string) => {
        const respuesta = await credencialesApi.get<Credencial[]>('/correo/'+correo)
        credenciales.value = respuesta.data
        return credenciales.value
    }

    const traeCredencialAuth = async (correo:string, contrasenia:string) => {
        const respuesta = await credencialesApi.get<Credencial[]>('/auth/'+correo+'/'+contrasenia)
        credenciales.value = respuesta.data
        return credenciales.value
    }

    const agregarCredencial = async (credencial:CredencialAgregar) => {
        const respuesta = await credencialesApi.post('/', credencial)
        if (respuesta.data.affectedRows >= 1) {
            console.log("Dato insertado")
            mensaje.value = 1
        }
    }

    const actualizarCredencial = async (credencial:Credencial) => {
        const respuesta = await credencialesApi.put('/', credencial)
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value = 1
        }
    }

    const borrarCredencial = async (credencial:Credencial) => {
        const respuesta = await credencialesApi.delete('/', {data: {id: credencial.id}})
        if (respuesta.data.fieldCount == 0) {
            mensaje.value = 1
        }
    }

    return{
        credenciales,
        mensaje,
        traeCredenciales,
        traeCredencialId,
        agregarCredencial,
        actualizarCredencial,
        borrarCredencial,
        traeCredencialPorCorreo,
        traeCredencialAuth
    }
}