<template>
    <div class="contenedor">
        <form @submit.prevent="registrarUsuario" class="formulario">
            <h2>Registro de usuario</h2>
            <div class="grupo">
                <label>Nombre:</label>
                <input type="text" v-model="usuario.nombre" required>
            </div>
            <div class="grupo">
                <label>Rol:</label>
                <input type="number" v-model="usuario.rol" required>
            </div>
            <div class="grupo">
                <label>Departamento:</label>
                <input type="number" v-model="usuario.departamento" required>
            </div>
            <div class="grupo">
                <label>Correo:</label>
                <input type="email" v-model="credencialesTemp.correo" required>
            </div>
            <div class="grupo">
                <label>Contraseña:</label>
                <input type="password" v-model="credencialesTemp.contrasenia" required>
            </div>
            <div class="error" v-if="error">
                {{ error }}
            </div>
            <div class="success" v-if="success">
                {{ success }}
            </div>
            <button type="submit">
                Registrarse
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCredenciales } from '../../credenciales/controladores/useCredenciales';
import type { CredencialAgregar, CredencialAgregarSinUsuario } from '@/modulos/credenciales/interfaces/credenciales-interface';
import type { UsuarioAgregar } from '@/modulos/usuarios/interfaces/usuarios-interface';
import { useUsuarios } from '@/modulos/usuarios/controladores/useUsuarios';
const { traeCredencialPorCorreo, agregarCredencial } = useCredenciales();
const { agregarUsuario } = useUsuarios();

    //const correo = ref('');
    //const contrasenia = ref('');
    const error = ref('');
    const success = ref('');
    const router = useRouter();

    onMounted(() => {
        //Verificar si ya hay un usuario autenticado
        if (localStorage.getItem('usuario') && localStorage.getItem('credencial')) {
            router.push('/bienvenida');
        }
    })

    let credencialesTemp = ref<CredencialAgregarSinUsuario>({
        correo: '',
        contrasenia: ''
    })

    let credenciales = ref<CredencialAgregar>({
        correo: '',
        contrasenia: '',
        usuario: 0
    })

    let usuario = ref<UsuarioAgregar>({
        nombre: '',
        rol: 0,
        departamento: 0
    })

    const registrarUsuario = async () => {
        error.value = ''; // Resetear el valor de error al iniciar el registro
        success.value = '';
        credenciales.value.correo = credencialesTemp.value.correo;
        credenciales.value.contrasenia = credencialesTemp.value.contrasenia;
        try {
            // Revisar si el correo ya existe en credenciales
            const credencial = await traeCredencialPorCorreo(credenciales.value.correo);
            if (credencial && credencial.length > 0) {
                error.value = 'El correo ya está registrado';
                return;
            }
            // Crear primero el usuario para insertarlo en credenciales
            const nuevoUsuario = await agregarUsuario(usuario.value);
            if (nuevoUsuario) {
                credenciales.value.usuario = nuevoUsuario;
                await agregarCredencial(credenciales.value);
                success.value = 'Usuario registrado con éxito';
                console.log("Usuario registrado con éxito");
                console.log(credenciales.value)
            } else {
                console.log("nuevo usuario: "+nuevoUsuario);
                console.log(nuevoUsuario);
                error.value = 'Error al crear el usuario';
            }
        } catch (err) {
            error.value = 'Ocurrió un error al registrar el usuario o la credencial';
        }
    }
</script>

<style scoped>
    .contenedor{
        max-width: 400px;
        margin: 0px auto;
        padding: 20px;
    }
    .formulario{
        display: flex;
        flex-direction: column;
        gap: 1em;
    }
    .grupo{
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }
    input{
        padding: 8px;
        border: 1px solid #DDD;
        border-radius: 5px;
    }
    button{
        padding: 10px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    .error{
        color: red;
        font-size: 0.9em;
        margin-top: 0.5em;
    }
    .success{
        color: green;
        font-size: 0.9em;
        margin-top: 0.5em;
    }
</style>