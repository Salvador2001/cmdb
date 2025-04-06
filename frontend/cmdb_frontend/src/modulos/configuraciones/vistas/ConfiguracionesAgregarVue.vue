<template>
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h4>Agregar configuración</h4>
            </div>
            <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                Datos agregados con éxito
            </div>
            <div class="card-body">
                <Form @submit="onTodoBien">
                    <div class="mb-3">
                        Serial
                        <Field name="serial" type="text" class="form-control" v-model="configuracion.serial" />
                        <ErrorMessage name="serial" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Nombre
                        <Field name="nombre" type="text" class="form-control" v-model="configuracion.nombre" />
                        <ErrorMessage name="nombre" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Fabricante
                        <Field name="fabricante" type="text" class="form-control" v-model="configuracion.fabricante" />
                        <ErrorMessage name="fabricante" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Tipo
                        <Field name="tipo" type="text" class="form-control" v-model="configuracion.tipo" />
                        <ErrorMessage name="tipo" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Fecha de compra
                        <Field name="fecha_compra" type="date" class="form-control" v-model="configuracion.fecha_compra" />
                        <ErrorMessage name="fecha_compra" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Estatus
                        <Field name="estatus" type="text" class="form-control" v-model="configuracion.estatus" />
                        <ErrorMessage name="estatus" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Ubicación
                        <Field name="ubicacion" type="number" class="form-control" v-model="configuracion.ubicacion" />
                        <ErrorMessage name="ubicacion" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        <button class="btn btn-primary" type="submit">Agregar</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useConfiguraciones } from '../controladores/useConfiguraciones';
import { Field, Form, ErrorMessage } from 'vee-validate';
import type { ConfiguracionAgregar } from '../interfaces/configuraciones-interface';

const { agregarConfiguracion, mensaje } = useConfiguraciones();

let configuracion = ref<ConfiguracionAgregar>({
    nombre: '',
    fabricante: '',
    tipo: '',
    estatus: '',
    ubicacion: null,
    serial: '',
    fecha_compra: '',
    rfc: null
});

const onTodoBien = async () => {
    await agregarConfiguracion(configuracion.value);
}
</script>

<style scoped>
    .errorValidacion{
        color: red;
        font-weight: bold;
    }
</style>