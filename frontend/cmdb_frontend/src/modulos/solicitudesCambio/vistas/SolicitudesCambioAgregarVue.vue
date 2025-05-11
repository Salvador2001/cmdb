<template>
    <div class="container mt-5">
        <div class="card mb-5">
            <div class="card-header">
                <h4>Solicitar RFC</h4>
            </div>
            <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                Solicitud enviada con éxito
            </div>
            <div class="card-body">
                <Form @submit="onTodoBien">
                    <div class="mb-3">
                        Presupuesto
                        <Field name="presupuesto" type="number" step="0.01" class="form-control" v-model="solicitud.presupuesto" />
                        <ErrorMessage name="presupuesto" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Descripción
                        <Field name="descripcion" as="textarea" type="text" class="form-control" v-model="solicitud.descripcion" />
                        <ErrorMessage name="descripcion" class="errorValidacion" />
                    </div>
                    <!-- <div class="mb-3">
                        Categoría
                        <Field name="categoria" as="select" class="form-control" v-model="incidencia.categoria">
                            <option value="" disabled>Seleccione una categoría...</option>
                            <option v-for="(categoria, index) in categorias" :key="index" :value="categoria.nombre">
                                {{ categoria.nombre }}
                            </option>
                        </Field>
                        <ErrorMessage name="categoria" class="errorValidacion" />
                    </div> -->
                    <div class="mb-3">
                        Configuración
                        <Field name="configuracion" as="select" class="form-control" v-model="folio_incidencia">
                            <option value="" disabled>Seleccione un elemento de configuración...</option>
                            <option v-for="(configuracion, index) in configuracionesConServicio" :key="index" :value="configuracion.folio_incidencia">
                                {{ configuracion.folio_incidencia + ": " + configuracion.serial + " - " +configuracion.nombre }}
                            </option>
                        </Field>
                        <ErrorMessage name="configuracion" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        <button class="btn btn-primary" type="submit">Enviar</button>
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
import { useConfiguraciones } from '@/modulos/configuraciones/controladores/useConfiguraciones';
import { useUbicacion } from '@/modulos/ubicacion/controladores/useUbicacion';
import { useSolicitudesCambio } from '../controladores/useSolicitudesCambio';
import type { SolicitudCambioAgregar } from '../interfaces/solicitudesCambio-interface';
import { useServicios } from '@/modulos/servicios/controladores/useServicios';
const { traeConfiguraciones, traeConfiguracionesConServicio, configuracionesConServicio, configuraciones } = useConfiguraciones()
const { traeUbicaciones, ubicaciones } = useUbicacion();
const { agregarSolicitudCambio, solicitudesCambio, mensaje } = useSolicitudesCambio();
const { traeServicioFolioIncidencia, servicios } = useServicios();
const { getFechaYHora } = dateHelper();


let usuario = ref();

let folio_incidencia = ref();

let solicitud = ref<SolicitudCambioAgregar>({
    fecha: '',
    estatus: '',
    requiere_comite: false,
    servicio: 0,
    descripcion: '',
    presupuesto: 0
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
    await traeConfiguracionesConServicio();
}); 

const onTodoBien = async () => {
    solicitud.value.fecha = getFechaYHora(new Date().toISOString());
    solicitud.value.estatus = 'Pendiente';
    if (solicitud.value.presupuesto >= 1500){
        solicitud.value.requiere_comite = true;
    } else {
        solicitud.value.requiere_comite = false;
    }
    await traeServicioFolioIncidencia(folio_incidencia.value);
    solicitud.value.servicio = servicios.value[0].id;
    await agregarSolicitudCambio(solicitud.value);
}
</script>

<style scoped>
    .errorValidacion {
        color: red;
        font-weight: bold;
    }
</style>