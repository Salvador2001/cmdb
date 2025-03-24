import { ref } from "vue"
import type { Rol, RolAgregar } from "../interfaces/roles-interface"
import rolesApi from "../api/rolesAPI"

export const useRoles = () => {
    const roles = ref<Rol[]>([])
    let mensaje = ref(0);

    const traeRoles = async () => {
        const respuesta = await rolesApi.get<Rol[]>('/')
        roles.value = respuesta.data
        console.log(roles.value) //debug
    }

    const traeRolId = async (id:number) => {
        const respuesta = await rolesApi.get<Rol[]>('/'+id)
        roles.value = respuesta.data
    }

    const agregarRol = async (rol:RolAgregar) => {
        const respuesta = await rolesApi.post('/', rol)
        if (respuesta.data.affectedRows >= 1) {
            console.log("Dato insertado")
            mensaje.value = 1
        }
    }

    const actualizarRol = async (rol:Rol) => {
        const respuesta = await rolesApi.put('/', rol)
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value = 1
        }
    }

    const borrarRol = async (rol:Rol) => {
        const respuesta = await rolesApi.delete('/', {data: {id: rol.id}})
        if (respuesta.data.fieldCount == 0) {
            mensaje.value = 1
        }
    }

    return{
        roles,
        mensaje,
        traeRoles,
        traeRolId,
        agregarRol,
        actualizarRol,
        borrarRol
    }
}