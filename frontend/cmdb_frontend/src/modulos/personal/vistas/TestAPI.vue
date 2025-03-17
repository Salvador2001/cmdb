<!-- filepath: /workspaces/cmdb/frontend/cmdb_frontend/src/modulos/personal/vistas/TestAPI.vue -->
<template>
    <div>
        <h1>Test API</h1>
        <button @click="testApi">Test API</button>
        <p v-if="response">{{ response }}</p>
        <p v-if="error" style="color: red;">{{ error }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import personalApi from '../api/personalAPI';

const response = ref<string | null>(null);
const error = ref<string | null>(null);

const testApi = async () => {
    try {
        const res = await personalApi.get('/');
        response.value = JSON.stringify(res.data);
        error.value = null;
    } catch (err) {
        response.value = null;
        error.value = 'Error al comunicarse con el backend';
        console.error(err);
    }
};
</script>

<style scoped>
/* Estilos personalizados */
</style>