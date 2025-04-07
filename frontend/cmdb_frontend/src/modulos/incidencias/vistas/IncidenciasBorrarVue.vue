<template>
    <div class="container mt-5" v-if="configuraciones[0]">
        <div class="card">
            <div class="card-header">
                <h4>Borrar configuración</h4>
            </div>
            <div class="alert alert-warning" role="alert">
                ¿Seguro que desea borrar la siguiente configuración?
                <i class="fa fa-warning"></i>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    Id
                    <input type="text" class="form-control" v-model="configuraciones[0].id" disabled>
                </div>
                <div class="mb-3">
                    Serial
                    <input type="text" class="form-control" v-model="configuraciones[0].serial" disabled>
                </div>
                <div class="mb-3">
                    Nombre
                    <input type="text" class="form-control" v-model="configuraciones[0].nombre" disabled>
                </div>
                <div class="mb-3">
                    Fabricante
                    <input type="text" class="form-control" v-model="configuraciones[0].fabricante" disabled>
                </div>
                <div class="mb-3">
                    Tipo
                    <input type="text" class="form-control" v-model="configuraciones[0].tipo" disabled>
                </div>
                <div class="mb-3">
                    Fecha de compra
                    <input type="date" class="form-control" v-model="configuraciones[0].fecha_compra" disabled>
                </div>
                <div class="mb-3">
                    Estatus
                    <input type="text" class="form-control" v-model="configuraciones[0].estatus" disabled>
                </div>
                <div class="mb-3">
                    Ubicación
                    <input type="number" class="form-control" v-model="configuraciones[0].ubicacion" disabled>
                </div>
                <div class="mb-3">
                    RFC
                    <input type="text" class="form-control" v-model="configuraciones[0].rfc" disabled>
                </div>
                <div class="mb-3">
                    <button class="btn btn-danger" @click="borrarConfiguracion(configuraciones[0])">Borrar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useConfiguraciones } from '../controladores/useConfiguraciones';

const { traeConfiguracionId, borrarConfiguracion, mensaje, configuraciones } = useConfiguraciones();

let idConfiguracion = 0;
const route = useRoute();
const routeRedirect = useRouter();

    watch(
        () => mensaje.value,
        newId => {
            routeRedirect.push('/configuraciones');
        }
    );

    onMounted(async () => {
        idConfiguracion = Number(route.params.id);
        await traeConfiguracionId(idConfiguracion);
    });
</script>

<style scoped>
</style>