import { ref } from "vue"
import type { Usuario, UsuarioAgregar } from "../interfaces/usuarios-interface"
import usuariosApi from "../api/usuariosAPI"

export const useUsuarios = () => {
    const usuarios = ref<Usuario[]>([])
    let mensaje = ref(0);

    const traeUsuarios = async () => {
        const respuesta = await usuariosApi.get<Usuario[]>('/')
        usuarios.value = respuesta.data
        console.log(usuarios.value) //debug
    }

    const traeUsuarioId = async (id:number) => {
        const respuesta = await usuariosApi.get<Usuario[]>('/'+id)
        usuarios.value = respuesta.data
    }

    const agregarUsuario = async (usuario:UsuarioAgregar) => {
        const respuesta = await usuariosApi.post('/', usuario)
        if (respuesta.data.affectedRows >= 1) {
            console.log("Dato insertado")
            mensaje.value = 1
            return respuesta.data.insertId  // devuelve el id del usuario insertado
        }
    }

    const actualizarUsuario = async (usuario:Usuario) => {
        const respuesta = await usuariosApi.put('/', usuario)
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value = 1
        }
    }

    const borrarUsuario = async (usuario:Usuario) => {
        const respuesta = await usuariosApi.delete('/', {data: {id: usuario.id}})
        if (respuesta.data.fieldCount == 0) {
            mensaje.value = 1
        }
    }

    return{
        usuarios,
        mensaje,
        traeUsuarios,
        traeUsuarioId,
        agregarUsuario,
        actualizarUsuario,
        borrarUsuario
    }
}