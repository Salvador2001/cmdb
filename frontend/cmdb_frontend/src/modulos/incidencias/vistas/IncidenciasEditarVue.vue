<template>
    <div class="container mt-5" v-if="incidencias[0]">
        <div class="card mb-5">
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
                    <input type="text" disabled class="form-control" v-model="incidencias[0].folio">
                </div>
                <div class="mb-3">
                    Descripción
                    <textarea class="form-control" :disabled="tieneServicio && (!isAdmin && !isTecnico)" v-model="incidencias[0].descripcion"></textarea>
                </div>
                <div class="mb-3">
                    Categoría
                    <select class="form-control" :disabled="tieneServicio && (!isAdmin && !isTecnico)" v-model="incidencias[0].categoria">
                        <option value="" disabled>Seleccione una categoría...</option>
                        <option v-for="(categoria, index) in categorias" :key="index" :value="categoria.nombre">
                            {{ categoria.nombre }}
                        </option>
                    </select>
                </div>
                <div class="mb-3">
                    Prioridad
                    <select class="form-control" :disabled="!isAdmin || !isTecnico" v-model="incidencias[0].prioridad">
                        <option value="" disabled>Seleccione una prioridad...</option>
                        <option v-for="(prioridad, index) in prioridades" :key="index" :value="prioridad.nombre">
                            {{ prioridad.nombre }}
                        </option>
                    </select>
                </div>
                <div class="mb-3">
                    Estatus
                    <select class="form-control" :disabled="!isAdmin || !isTecnico" v-model="incidencias[0].estatus">
                        <option value="" disabled>Seleccione un estatus...</option>
                        <option v-for="(estatus, index) in estatusList" :key="index" :value="estatus.nombre">
                            {{ estatus.nombre }}
                        </option>
                    </select>
                </div>
                <div class="mb-3">
                    Configuración
                    <select class="form-control" :disabled="tieneServicio && (!isAdmin || !isTecnico)" v-model="incidencias[0].configuracion">
                        <option value="" disabled>Seleccione una configuración...</option>
                        <option v-for="(configuracion, index) in configuraciones" :key="index" :value="configuracion.id">
                            {{ configuracion.serial + " - " + configuracion.nombre }}
                        </option>
                    </select>
                </div>
                <div v-if="tieneServicio" class="mb-3">
                    Asignar a técnico
                    <select class="form-control" :disabled="!isAdmin || !isTecnico" v-model="servicios[0].responsable">
                        <option value="" disabled>Seleccione un técnico...</option>
                        <option v-for="(usuario, index) in usuarios" :key="index" :value="usuario.id">
                            {{ usuario.nombre }}
                        </option>
                    </select>
                </div>
                <div v-if="tieneServicio" class="mb-3">
                    Diagnóstico
                    <textarea class="form-control" :disabled="!isAdmin && !isTecnico" v-model="servicios[0].diagnostico"></textarea>
                </div>
                <div v-if="tieneServicio" class="mb-3">
                    Servicios realizados
                    <select :disabled=" tieneServicioRealizado " class="form-control" multiple v-model="serviciosSeleccionados">
                        <option v-for="servicio in catalogoServicios" :key="servicio.id" :value="servicio.id">
                            {{ servicio.nombre + " - " + servicio.tiempo_estimado + " min" }}
                        </option>
                    </select>
                </div>
                <div class="mb-3">
                    <button :class="{ disabled: tieneServicio && (!isAdmin && !isTecnico) }" class="btn btn-primary" @click="onActualizar(incidencias[0])">Actualizar</button>
                    <button :class="{ disabled: tieneServicio || (!isAdmin || !isTecnico) }" class="btn btn-outline-primary ms-2" @click="crearServicio(incidencias[0].id)">Iniciar servicio</button>
                    <button :class="{ disabled: ['Terminada', 'Liberada', 'Rechazada'].includes(incidencias[0].estatus) }" v-if="tieneServicio && (isAdmin || isTecnico)" class="btn btn-success ms-2" @click="resolverIncidencia(incidencias[0])">Resolver Incidencia</button> 
                    <button :class="{ disabled: (['Liberada', 'Rechazada'].includes(incidencias[0].estatus) || (isAdmin || isTecnico)) || !tieneServicio }" class="btn btn-secondary ms-2" @click=" onLiberarIncidencia() ">Liberar Incidencia</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useIncidencias } from '../controladores/useIncidencias';
import { useConfiguraciones } from '@/modulos/configuraciones/controladores/useConfiguraciones';
import { dateHelper } from '@/util/dateHelper';
import type { Incidencia } from '../interfaces/incidencias-interface';
import { useServicios } from '@/modulos/servicios/controladores/useServicios';
import { useUsuarios } from '@/modulos/usuarios/controladores/useUsuarios';
import type { ServicioAgregar } from '@/modulos/servicios/interfaces/servicios-interface';
import type { Usuario } from '@/modulos/usuarios/interfaces/usuarios-interface';
import { useCatalogoServicios } from '@/modulos/catalogoServicios/controladores/useCatalogoServicios';
import { useServiciosRealizados } from '@/modulos/serviciosRealizados/controladores/useServiciosRealizados';

const { traeIncidenciaId, actualizarIncidencia, mensaje, incidencias } = useIncidencias();
const { traeConfiguraciones, configuraciones } = useConfiguraciones();
const { agregarServicio, traeServicioId, actualizarServicio, traeServicioIncidencia, servicios, mensaje: mensajeServicio } = useServicios();
const { traeUsuarios, usuarios, usuarios: usuarioAuth } = useUsuarios();
const { traeCatalogoServicios, catalogoServicios } = useCatalogoServicios();
const { agregarServiciosRealizados, traeServiciosRealizadosId, serviciosRealizados } = useServiciosRealizados();


const { getFechaYHora } = dateHelper();

const route = useRoute();
const router = useRouter();
let idIncidencia = 0;
let tieneServicio = ref(false);
let isAdmin = ref(false);
let isTecnico = ref(false);
let serviciosSeleccionados = ref<number[]>([]);
let tieneServicioRealizado = ref(false);

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
    { id: 2, nombre: 'En Proceso' },
    { id: 3, nombre: 'Terminada' },
    { id: 4, nombre: 'Liberada' },
    { id: 5, nombre: 'Rechazada' }
];

onMounted(async () => {
    const usuarioAuth = ref(JSON.parse(localStorage.getItem('usuario') || '{}'))
    if (usuarioAuth.value.rol == 1){
        isAdmin.value = true
        isTecnico.value = true
    } else if (usuarioAuth.value.rol == 3){
        isTecnico.value = true
    }
    idIncidencia = Number(route.params.id);
    await traeIncidenciaId(idIncidencia);
    await traeConfiguraciones();
    await traeCatalogoServicios();
    incidencias.value[0].fecha_creacion = getFechaYHora(incidencias.value[0].fecha_creacion);
    if (incidencias.value[0].fecha_resolucion) {
        incidencias.value[0].fecha_resolucion = getFechaYHora(incidencias.value[0].fecha_resolucion);
    }
    console.log(incidencias);

    await traeServicioIncidencia(idIncidencia);
    if (servicios.value[0]) {
        tieneServicio.value = true;
        await traeServiciosRealizadosId(servicios.value[0].id);
        serviciosSeleccionados.value = serviciosRealizados.value.map((servicio) => servicio.servicio_realizado);
        tieneServicioRealizado.value = serviciosSeleccionados.value.length > 0;
    }
    await traeUsuarios();
    usuarios.value = usuarios.value.filter((usuario: Usuario) => usuario.rol == 3);
    console.log("tiene servicio?")
    console.log(tieneServicio.value)
    console.log("es admin?"+ isAdmin.value)
    console.log("es tecnico?"+ isTecnico.value)
});

const crearServicio = async (incidencia: number) => {
    console.log("servicio")
    console.log(servicios)
    const nuevoServicio: ServicioAgregar = {
        tipo: incidencias.value[0].categoria,
        incidencia: incidencia,
        responsable: null,
        diagnostico: null
    };
    // servicios.value[0].tipo = incidencias.value[0].categoria;
    // servicios.value[0].id = incidencia;
    await agregarServicio(nuevoServicio);
    console.log("mensaje: "+mensajeServicio.value)
    if (mensajeServicio.value == 2) {
        tieneServicio.value = true;
        await traeServicioIncidencia(idIncidencia);
    }
};


const onActualizar = async (incidencia: Incidencia) => {
    // mensaje.value = 0;
    if (incidencias.value[0].estatus === 'Rechazada') {
        incidencia.fecha_resolucion = getFechaYHora(new Date().toISOString());
    }
    await actualizarIncidencia(incidencia);
    await actualizarServicio(servicios.value[0]);

    // Guardar servicios realizados
    for (const idServicio of serviciosSeleccionados.value) {
        await agregarServiciosRealizados({
            servicio_asignado: servicios.value[0].id,
            servicio_realizado: idServicio
        });
    }
};

const onLiberarIncidencia = async () => {
    if (servicios.value[0]){
        // Redirige a la vista de EvaluacionesAgregarVue, pasando el id del servicio
        router.push({ name: 'evaluaciones-agregar', params: { servicioId: servicios.value[0].id } });
    }
};

const resolverIncidencia = async ( incidencia: Incidencia ) => {
    incidencia.estatus = 'Terminada';
    incidencia.fecha_resolucion = getFechaYHora(new Date().toISOString());
    await onActualizar(incidencia);
}
    


</script>

<style scoped>
</style>