<template>
    <div class="contenedor">
        <form @submit.prevent="loginUsuario" class="formulario">
            <h2>Login</h2>
            <div class="grupo">
                <label>Correo:</label>
                <input type="email" v-model="credenciales.correo" required>
            </div>
            <div class="grupo">
                <label>Contraseña:</label>
                <input type="password" v-model="credenciales.contrasenia" required>
            </div>
            <div class="error" v-if="error">
                {{ error }}
            </div>
            <div class="success" v-if="success">
                {{ success }}
            </div>
            <button type="submit">
                Acceder
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCredenciales } from '../../credenciales/controladores/useCredenciales';
import type { CredencialAgregar, CredencialAgregarSinUsuario } from '@/modulos/credenciales/interfaces/credenciales-interface';
import type { Usuario, UsuarioAgregar } from '@/modulos/usuarios/interfaces/usuarios-interface';
import { useUsuarios } from '@/modulos/usuarios/controladores/useUsuarios';
const { traeCredencialAuth } = useCredenciales();
const { traeUsuarioId, usuarios } = useUsuarios();

    //const correo = ref('');
    //const contrasenia = ref('');
    const error = ref('');
    const success = ref('');
    const router = useRouter();

    onMounted(() => {
        // Verificar si ya hay un usuario autenticado
        if (localStorage.getItem('usuario') && localStorage.getItem('credencial')) {
            router.push('/bienvenida');
        }
    })

    let credenciales = ref<CredencialAgregar>({
        correo: '',
        contrasenia: '',
        usuario: 0
    })

    const loginUsuario = async () => {
        error.value = ''; // Resetear el valor de error al iniciar el registro
        success.value = '';
        try {
            const credencial = await traeCredencialAuth(credenciales.value.correo, credenciales.value.contrasenia);
            if (credencial) {
                credenciales.value.usuario = credencial[0].usuario;
                await traeUsuarioId(credenciales.value.usuario);
                success.value = 'Usuario autenticado';
                console.log("authed");
                console.log(credenciales.value);
                console.log("usuario authed");
                console.log(usuarios.value);
                // Guardar la información del usuario y la credencial en localStorage
                localStorage.setItem('usuario', JSON.stringify(usuarios.value[0]));
                localStorage.setItem('credencial', JSON.stringify(credenciales.value));
                // Esperar 2 segundos antes de redirigir y recargar la página
                //  workaround temporal para el auth
                setTimeout(() => {
                    router.push('/bienvenida').then(() => {
                        location.reload();
                    });
                }, 2000);
            } else {
                error.value = 'Error al autenticar';
            }
        } catch (err) {
            error.value = 'Usuario o contraseña incorrectos';
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