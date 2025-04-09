<template>
    <div class="container mt-5" v-if="incidencias[0]">
        <div class="card">
            <div class="card-header">
                <h4>Editar incidencia</h4>
            </div>
            <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                Incidencia actualizada con éxito
            </div>
            <div class="card-body">
                <div class="mb-3">
                    Id
                    <input type="text" class="form-control" v-model="incidencias[0].id" disabled>
                </div>
                <div class="mb-3">
                    Folio
                    <input type="text" class="form-control" v-model="incidencias[0].folio">
                </div>
                <div class="mb-3">
                    Descripción
                    <textarea class="form-control" v-model="incidencias[0].descripcion"></textarea>
                </div>
                <div class="mb-3">
                    Categoría
                    <select class="form-control" v-model="incidencias[0].categoria">
                        <option value="" disabled>Seleccione una categoría...</option>
                        <option v-for="(categoria, index) in categorias" :key="index" :value="categoria.nombre">
                            {{ categoria.nombre }}
                        </option>
                    </select>
                </div>
                <div class="mb-3">
                    Prioridad
                    <select class="form-control" v-model="incidencias[0].prioridad">
                        <option value="" disabled>Seleccione una prioridad...</option>
                        <option v-for="(prioridad, index) in prioridades" :key="index" :value="prioridad.nombre">
                            {{ prioridad.nombre }}
                        </option>
                    </select>
                </div>
                <div class="mb-3">
                    Estatus
                    <select class="form-control" v-model="incidencias[0].estatus">
                        <option value="" disabled>Seleccione un estatus...</option>
                        <option v-for="(estatus, index) in estatusList" :key="index" :value="estatus.nombre">
                            {{ estatus.nombre }}
                        </option>
                    </select>
                </div>
                <div class="mb-3">
                    Configuración
                    <select class="form-control" v-model="incidencias[0].configuracion">
                        <option value="" disabled>Seleccione una configuración...</option>
                        <option v-for="(configuracion, index) in configuraciones" :key="index" :value="configuracion.id">
                            {{ configuracion.serial + " - " + configuracion.nombre }}
                        </option>
                    </select>
                </div>
                <div class="mb-3">
                    <button class="btn btn-primary" @click="actualizarIncidencia(incidencias[0])">Actualizar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useIncidencias } from '../controladores/useIncidencias';
import { useConfiguraciones } from '@/modulos/configuraciones/controladores/useConfiguraciones';
import { dateHelper } from '@/util/dateHelper';

const { traeIncidenciaId, actualizarIncidencia, mensaje, incidencias } = useIncidencias();
const { traeConfiguraciones, configuraciones } = useConfiguraciones();

const { getFechaYHora } = dateHelper();

const route = useRoute();
let idIncidencia = 0;

const categorias = [
    { id: 1, nombre: 'Hardware' },
    { id: 2, nombre: 'Software' },
    { id: 3, nombre: 'Red' },
    { id: 4, nombre: 'Otros' }
];

const prioridades = [
    { id: 1, nombre: 'Alta' },
    { id: 2, nombre: 'Media' },
    { id: 3, nombre: 'Baja' }
];

const estatusList = [
    { id: 1, nombre: 'Abierta' },
    { id: 2, nombre: 'Cerrada' },
    { id: 3, nombre: 'En Proceso' }
];

onMounted(async () => {
    idIncidencia = Number(route.params.id);
    await traeIncidenciaId(idIncidencia);
    await traeConfiguraciones();
    incidencias.value[0].fecha_creacion = getFechaYHora(incidencias.value[0].fecha_creacion);
    console.log(incidencias);
});
</script>

<style scoped>
</style>