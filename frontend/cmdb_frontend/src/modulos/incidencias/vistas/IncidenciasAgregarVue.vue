<template>
    <div class="container mt-5">
        <div class="card mb-5">
            <div class="card-header">
                <h4>Agregar incidencia</h4>
            </div>
            <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                Incidencia agregada con éxito
            </div>
            <div class="card-body">
                <Form @submit="onTodoBien">
                    <div class="mb-3">
                        Folio
                        <Field name="folio" type="text" class="form-control" v-model="incidencia.folio" />
                        <ErrorMessage name="folio" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Descripción
                        <Field name="descripcion" as="textarea" type="text" class="form-control" v-model="incidencia.descripcion" />
                        <ErrorMessage name="descripcion" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Categoría
                        <Field name="categoria" as="select" class="form-control" v-model="incidencia.categoria">
                            <option value="" disabled>Seleccione una categoría...</option>
                            <option v-for="(categoria, index) in categorias" :key="index" :value="categoria.nombre">
                                {{ categoria.nombre }}
                            </option>
                        </Field>
                        <ErrorMessage name="categoria" class="errorValidacion" />
                    </div>
                    <!-- <div class="mb-3">
                        Prioridad
                        <Field name="prioridad" type="text" class="form-control" disabled v-model="incidencia.prioridad" />
                        <ErrorMessage name="prioridad" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Estatus
                        <Field name="estatus" type="text" class="form-control" disabled v-model="incidencia.estatus" />
                        <ErrorMessage name="estatus" class="errorValidacion" />
                    </div> -->
                    <!-- <div class="mb-3">
                        Fecha de creación
                        <Field name="fecha_creacion" type="datetime-local" class="form-control" v-model="incidencia.fecha_creacion" />
                        <ErrorMessage name="fecha_creacion" class="errorValidacion" />
                    </div> -->
                    <!-- <div class="mb-3">
                        Autor
                        <Field name="autor" type="number" class="form-control" v-model="incidencia.autor" />
                        <ErrorMessage name="autor" class="errorValidacion" />
                    </div> -->
                    <div class="mb-3">
                        Configuración
                        <Field name="configuracion" as="select" class="form-control" v-model="incidencia.configuracion">
                            <option value="" disabled>Seleccione un elemento de configuración...</option>
                            <option v-for="(configuracion, index) in configuraciones" :key="index" :value="configuracion.id">
                                {{ configuracion.serial + " - " +configuracion.nombre }}
                            </option>
                        </Field>
                        <ErrorMessage name="configuracion" class="errorValidacion" />
                    </div>
                    <!-- <div class="mb-3">
                        Departamento
                        <Field name="departamento" type="number" class="form-control" v-model="incidencia.departamento" />
                        <ErrorMessage name="departamento" class="errorValidacion" />
                    </div> -->
                    <div class="mb-3">
                        <button class="btn btn-primary" type="submit">Agregar</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useIncidencias } from '../controladores/useIncidencias';
import { Field, Form, ErrorMessage } from 'vee-validate';
import type { IncidenciaAgregar } from '../interfaces/incidencias-interface';
import { dateHelper } from '@/util/dateHelper';
import { useConfiguraciones } from '@/modulos/configuraciones/controladores/useConfiguraciones';
const { traeConfiguracionesPorDepartamento, configuraciones } = useConfiguraciones()

const { agregarIncidencia, mensaje } = useIncidencias();
const { getFechaYHora } = dateHelper();


let usuario = ref();

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

const estatus = [
    { id: 1, nombre: 'Abierta' },
    { id: 2, nombre: 'Cerrada' },
    { id: 3, nombre: 'En Proceso' }
];

let incidencia = ref<IncidenciaAgregar>({
    folio: '',
    descripcion: '',
    categoria: '',
    prioridad: '',
    estatus: '',
    fecha_creacion: '',
    autor: 0,
    configuracion: 0,
    departamento: 0
});

onMounted(async () => {
    // obtener usuario autenticado
    usuario = ref(JSON.parse(localStorage.getItem('usuario') || '{}'));
    console.log(usuario.value.departamento);
    await traeConfiguracionesPorDepartamento(usuario.value.departamento);
    console.log(configuraciones.value);
}); 

const onTodoBien = async () => {
    incidencia.value.fecha_creacion = getFechaYHora(new Date().toISOString());
    incidencia.value.prioridad = 'N/A';
    incidencia.value.estatus = 'Abierta';
    incidencia.value.autor = usuario.value.id;
    incidencia.value.departamento = usuario.value.departamento;
    await agregarIncidencia(incidencia.value);
}
</script>

<style scoped>
    .errorValidacion {
        color: red;
        font-weight: bold;
    }
</style>