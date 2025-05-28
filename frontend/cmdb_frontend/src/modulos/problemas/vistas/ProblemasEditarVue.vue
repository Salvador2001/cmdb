<template>
    <div class="container mt-5" v-if="problemas[0]">
        <div class="card mb-5">
            <div class="card-header">
                <h4>Editar Reporte de Problema</h4>
            </div>
            <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                Reporte actualizado con éxito
            </div>
            <div class="card-body">
                <div class="mb-3">
                    Id
                    <input type="text" class="form-control" v-model="problemas[0].id" disabled>
                </div>
                <div class="mb-3">
                    Folio
                    <input type="text" class="form-control" v-model="problemas[0].folio" disabled>
                </div>
                <div class="mb-3">
                    Descripción
                    <textarea class="form-control" v-model="problemas[0].descripcion"></textarea>
                </div>
                <div class="mb-3">
                    Incidencias relacionadas
                    <select class="form-control" multiple v-model="incidenciasSeleccionadas">
                        <option v-for="incidencia in incidencias" :key="incidencia.id" :value="incidencia.id">
                            {{ incidencia.folio }} - {{ incidencia.estatus }} - {{ incidencia.descripcion }}
                        </option>
                    </select>
                </div>
                <div class="mb-3">
                    Error conocido
                    <input type="text" class="form-control" v-model="problemas[0].error_conocido">
                </div>
                <div class="mb-3">
                    Causa raíz
                    <input type="text" class="form-control" v-model="problemas[0].causa_raiz">
                </div>
                <div class="mb-3">
                    Solución encontrada
                    <textarea class="form-control" v-model="problemas[0].solucion"></textarea>
                </div>
                <div class="mb-3">
                    Departamento
                    <select :disabled=" !isAdmin " class="form-control" v-model="problemas[0].departamento">
                        <option value="" disabled>Seleccione un departamento...</option>
                        <option v-for="(departamento, index) in departamentos" :key="index" :value="departamento.id">
                            {{ departamento.nombre }}
                        </option>
                    </select>
                </div>
                <div class="mb-3">
                    Estatus
                    <select class="form-control" v-model="problemas[0].estatus">
                        <option value="" disabled>Seleccione un estatus...</option>
                        <option v-for="(estatus, index) in estatusList" :key="index" :value="estatus.nombre">
                            {{ estatus.nombre }}
                        </option>
                    </select>
                </div>
                <!-- <div class="mb-3">
                    Prioridad
                    <select :disabled=" !isAdmin " class="form-control" v-model="problemas[0].prioridad">
                        <option value="" disabled>Seleccione una prioridad...</option>
                        <option v-for="(prioridad, index) in prioridades" :key="index" :value="prioridad.nombre">
                            {{ prioridad.nombre }}
                        </option>
                    </select>
                </div> -->
                <div class="mb-3">
                    Fecha de asignación
                    <input type="text" class="form-control" v-model="problemas[0].fecha_asignacion" disabled>
                </div>
                <div class="mb-3">
                    Asignar a técnico responsable
                    <select :disabled=" !isAdmin " class="form-control" v-model="problemas[0].responsable">
                        <option value="" disabled>Seleccione un técnico...</option>
                        <option v-for="(responsable, index) in responsables" :key="index" :value="responsable.id">
                            {{ responsable.nombre }}
                        </option>
                    </select>
                </div>
                <div class="mb-3">
                    <button class="btn btn-primary" @click="onActualizar(problemas[0])">Actualizar reporte</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { dateHelper } from '@/util/dateHelper';
import { useProblemas } from '../controladores/useProblemas';
import type { Problema } from '../interfaces/problemas-interface';
import { useUsuarios } from '@/modulos/usuarios/controladores/useUsuarios';
import { useDepartamentos } from '@/modulos/departamentos/controladores/useDepartamentos';
import { useIncidenciasProblema } from '@/modulos/incidenciasProblema/controladores/useIncidenciasProblema';
import { useIncidencias } from '@/modulos/incidencias/controladores/useIncidencias';

const { traeUsuarios, usuarios: responsables } = useUsuarios();
const { traeProblemaId, actualizarProblema, problemas, mensaje } = useProblemas();
const { traeDepartamentos, departamentos } = useDepartamentos();
const { traeIncidencias, incidencias } = useIncidencias();
const { traeIncidenciasProblemaId, agregarIncidenciaProblema, borrarIncidenciaProblema, incidenciasProblema } = useIncidenciasProblema();
const { getFechaYHora } = dateHelper();

const route = useRoute();

let idProblema = 0;
let isAdmin = ref(false);
let isTecnico = ref(false);
let incidenciasSeleccionadas = ref<number[]>([]);
let campoTecnicoAsignado = ref();

const estatusList = [
    { id: 1, nombre: 'Identificado' },
    { id: 2, nombre: 'En Proceso' },
    { id: 3, nombre: 'Resuelto' },
    { id: 4, nombre: 'Liberado' },
];

// const prioridades = [
//     { id: 1, nombre: 'Alta' },
//     { id: 2, nombre: 'Media' },
//     { id: 3, nombre: 'Baja' }
// ];

onMounted(async () => {
    const usuarioAuth = ref(JSON.parse(localStorage.getItem('usuario') || '{}'))
    if (usuarioAuth.value.rol == 1){
        isAdmin.value = true
        isTecnico.value = true
    } else if (usuarioAuth.value.rol == 9){
        isTecnico.value = true
        estatusList.pop(); // Técnico no puede cambiar el estatus a liberado
    }
    idProblema = Number(route.params.id);
    await traeProblemaId(idProblema);
    await traeUsuarios();
    await traeDepartamentos();
    await traeIncidencias();
    await traeIncidenciasProblemaId(idProblema);
    campoTecnicoAsignado.value = problemas.value[0].responsable;
    if (incidenciasProblema.value.length > 0) {
        incidenciasSeleccionadas.value = incidenciasProblema.value.map(incidencia => incidencia.incidencia);
    }
    responsables.value = responsables.value.filter(usuario => usuario.rol === 9); // Obtener solo técnicos especializados en problemas
    problemas.value[0].fecha_creacion = getFechaYHora(problemas.value[0].fecha_creacion);
    if (problemas.value[0].fecha_resolucion) {
        problemas.value[0].fecha_resolucion = getFechaYHora(problemas.value[0].fecha_resolucion);
    }
});


const onActualizar = async (problema: Problema) => {
    if (problema.estatus === 'Resuelto' || problema.estatus === 'Liberado' && problema.fecha_resolucion === null) {
        problema.fecha_resolucion = getFechaYHora(new Date().toISOString());
    } else {
        problema.fecha_resolucion = null;
    }
    if (problema.responsable && problema.responsable !== campoTecnicoAsignado.value) {
        problema.fecha_asignacion = getFechaYHora(new Date().toISOString());
    }
    if (problema.fecha_asignacion){
        problema.fecha_asignacion = getFechaYHora(problema.fecha_asignacion);
    }
    // Actualizar incidencias relacionadas
    for (const incidenciaId of incidenciasSeleccionadas.value) {
        const existe = incidenciasProblema.value.some(inc => inc.incidencia === incidenciaId);
        if (!existe) {
            await agregarIncidenciaProblema({ incidencia: incidenciaId, problema: problema.id });
        }
    }
    // Eliminar incidencias que ya no están seleccionadas
    for (const incProblema of incidenciasProblema.value) {
        if (!incidenciasSeleccionadas.value.includes(incProblema.incidencia)) {
            await borrarIncidenciaProblema(incProblema.incidencia, problema.id);
        }
    }
    // mensaje.value = 0;
    await actualizarProblema(problema);
};

</script>

<style scoped>
</style>