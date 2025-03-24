<template>
    <div class="container mt-5" v-if="configuraciones[0]">
        <div class="card">
            <div class="card-header">
                <h4>Editar configuración</h4>
            </div>
            <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                Datos actualizados con éxito
            </div>
            <div class="card-body">
                <div class="mb-3">
                    Id
                    <input type="text" class="form-control" v-model="configuraciones[0].id" disabled>
                </div>
                <div class="mb-3">
                    Nombre
                    <input type="text" class="form-control" v-model="configuraciones[0].nombre">
                </div>
                <div class="mb-3">
                    Fabricante
                    <input type="text" class="form-control" v-model="configuraciones[0].fabricante">
                </div>
                <div class="mb-3">
                    Tipo
                    <input type="text" class="form-control" v-model="configuraciones[0].tipo">
                </div>
                <div class="mb-3">
                    Estatus
                    <input type="text" class="form-control" v-model="configuraciones[0].estatus">
                </div>
                <div class="mb-3">
                    Ubicación
                    <input type="number" class="form-control" v-model="configuraciones[0].ubicacion">
                </div>
                <div class="mb-3">
                    <button class="btn btn-primary" @click="actualizarConfiguracion(configuraciones[0])">Actualizar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useConfiguraciones } from '../controladores/useConfiguraciones';

const { traeConfiguracionId, actualizarConfiguracion, mensaje, configuraciones } = useConfiguraciones();

let idConfiguracion = 0;
const route = useRoute();

onMounted(async () => {
    idConfiguracion = Number(route.params.id);
    await traeConfiguracionId(idConfiguracion);
});
</script>

<style scoped>
</style>