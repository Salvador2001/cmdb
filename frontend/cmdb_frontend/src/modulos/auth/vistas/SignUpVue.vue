<template>
    <div class="contenedor">
        <form @click.prevent="registrarUsuario" class="formulario">
            <h2>Registro de usuario</h2>
            <div class="grupo">
                <label>Correo:</label>
                <input type="email" v-model="correo" required>
            </div>
            <div class="grupo">
                <label>Contraseña:</label>
                <input type="password" v-model="clave" required>
            </div>
            <div class="error" v-if="error">
                {{ error }}
            </div>
            <button type="submit">
                Registrarse
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

    const correo = ref('');
    const clave = ref('');
    const error = ref(null);
    const router = useRouter();

    const registrarUsuario = async () => {
        error.value = null;
        try{
            
        } catch (err){
            
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
</style>