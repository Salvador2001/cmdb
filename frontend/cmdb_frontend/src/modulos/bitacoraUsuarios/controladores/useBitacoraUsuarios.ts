import { ref } from "vue";
import type { BitacoraUsuario, BitacoraUsuarioAgregar } from "../interfaces/bitacoraUsuarios-interface";
import bitacoraUsuariosApi from "../api/bitacoraUsuariosAPI";

export const useBitacoraUsuarios = () => {
    const bitacoraUsuarios = ref<BitacoraUsuario[]>([]);
    let mensaje = ref(0);

    const traeBitacoraUsuarios = async () => {
        const respuesta = await bitacoraUsuariosApi.get<BitacoraUsuario[]>('/');
        bitacoraUsuarios.value = respuesta.data;
        console.log(bitacoraUsuarios.value); // Debug
    };

    const traeBitacoraUsuarioId = async (id: number) => {
        const respuesta = await bitacoraUsuariosApi.get<BitacoraUsuario[]>('/' + id);
        bitacoraUsuarios.value = respuesta.data;
    };

    const agregarBitacoraUsuario = async (bitacoraUsuario: BitacoraUsuarioAgregar) => {
        const respuesta = await bitacoraUsuariosApi.post('/', bitacoraUsuario);
        if (respuesta.data.affectedRows >= 1) {
            console.log("Dato insertado");
            mensaje.value = 1;
        }
    };

    const actualizarBitacoraUsuario = async (bitacoraUsuario: BitacoraUsuario) => {
        const respuesta = await bitacoraUsuariosApi.put('/', bitacoraUsuario);
        if (respuesta.data.affectedRows >= 1) {
            mensaje.value = 1;
        }
    };

    const borrarBitacoraUsuario = async (bitacoraUsuario: BitacoraUsuario) => {
        const respuesta = await bitacoraUsuariosApi.delete('/', { data: { id: bitacoraUsuario.id } });
        if (respuesta.data.fieldCount == 0) {
            mensaje.value = 1;
        }
    };

    return {
        bitacoraUsuarios,
        mensaje,
        traeBitacoraUsuarios,
        traeBitacoraUsuarioId,
        agregarBitacoraUsuario,
        actualizarBitacoraUsuario,
        borrarBitacoraUsuario
    };
};