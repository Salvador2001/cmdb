<template>
    <div class="container mt-5" v-if="servicios[0]">
        <div class="card mb-5">
            <div class="card-header">
                <h4>Evaluar Servicio</h4>
            </div>
            <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                Servicio evaluado con éxito
            </div>
            <div class="card-body">
                <Form @submit="onTodoBien">
                    <div class="mb-3">
                        Puntuación:
                        <br>
                        <div class="form-check form-check-inline">
                            <Field class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Excelente" v-model="evaluacion.puntuacion" />
                            <label class="form-check-label" for="inlineRadio1">Excelente</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <Field class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Bueno" v-model="evaluacion.puntuacion" />
                            <label class="form-check-label" for="inlineRadio2">Bueno</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <Field class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="Regular" v-model="evaluacion.puntuacion" />
                            <label class="form-check-label" for="inlineRadio2">Regular</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <Field class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="Malo" v-model="evaluacion.puntuacion" />
                            <label class="form-check-label" for="inlineRadio2">Malo</label>
                        </div>
                        <div class="form-check form-check-inline">
                            <Field class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio5" value="Terrible" v-model="evaluacion.puntuacion" />
                            <label class="form-check-label" for="inlineRadio2">Terrible</label>
                        </div>
                    </div>
                    <div class="mb-3">
                        Comentario
                        <Field name="comentario" as="textarea" type="text" class="form-control" v-model="evaluacion.comentario" />
                        <ErrorMessage name="comentario" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        <button class="btn btn-primary" type="submit">Evaluar y liberar</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { dateHelper } from '@/util/dateHelper';
import { useServicios } from '@/modulos/servicios/controladores/useServicios';
import { useRoute } from 'vue-router';
import { useEvaluaciones } from '../controladores/useEvaluaciones';
import type { EvaluacionAgregar } from '../interfaces/evaluaciones-interface';
import { useIncidencias } from '@/modulos/incidencias/controladores/useIncidencias';
const { traeServicioId, servicios } = useServicios();
const { traeIncidenciaId, actualizarIncidencia, incidencias, mensaje: mensajeIncidencia } = useIncidencias();
const { agregarEvaluacion, mensaje } = useEvaluaciones();
const { getFechaYHora } = dateHelper();

const route = useRoute();
let usuario = ref();
let idServicio = 0;

let evaluacion = ref<EvaluacionAgregar>({
    fecha: '',
    puntuacion: '',
    comentario: '',
    evaluador: 0,
    servicio: 0
});

onMounted(async () => {
    // obtener usuario autenticado
    usuario = ref(JSON.parse(localStorage.getItem('usuario') || '{}'));
    console.log(usuario.value.departamento);
    // if(usuario.value.rol == 1){
    //     await traeConfiguraciones()
    // }
    // else{
    //     await traeConfiguracionesPorDepartamento(usuario.value.departamento);
    //     console.log(configuraciones.value);
    // }
    idServicio = Number(route.params.servicioId);
    await traeServicioId(idServicio);
    await traeIncidenciaId(servicios.value[0].incidencia);
    console.log("servicio");
    console.log(servicios.value);
    console.log("incidencia");
    console.log(incidencias.value);
}); 

const onTodoBien = async () => {
    evaluacion.value.fecha = getFechaYHora(new Date().toISOString());
    incidencias.value[0].fecha_creacion = getFechaYHora(incidencias.value[0].fecha_creacion);
    incidencias.value[0].estatus = 'Liberada';
    evaluacion.value.evaluador = usuario.value.id;
    evaluacion.value.servicio = servicios.value[0].id;
    await agregarEvaluacion(evaluacion.value);
    await actualizarIncidencia(incidencias.value[0]);
    console.log("incidencia no actualizada");
    console.log(incidencias.value);
    if (mensajeIncidencia.value == 1) {
        console.log("incidencia actualizada");
        console.log(incidencias.value);
    }
}
</script>

<style scoped>
    .errorValidacion {
        color: red;
        font-weight: bold;
    }
</style>