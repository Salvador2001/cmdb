<template>
    <section>
        <h3>Evaluaciones</h3>
    </section>
    <div class="table-container mb-5">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Incidencia</th>
                    <th>Responsable</th>
                    <th>Puntaje</th>
                    <th>Comentario</th>
                    <th>Evaluador</th>
                    <th>Fecha de evaluación</th>
                </tr>
            </thead>
            <tbody v-if="isAdmin == true ">
                <tr v-if="evaluaciones.length === 0">
                    <td class="centrado" colspan="7">Sin evaluaciones registradas</td>
                </tr>
                <tr v-else v-for="(evaluacion, index) in evaluacionesVista" :key="index">
                    <td> {{ evaluacion.id }} </td>
                    <td> {{ evaluacion.incidencia }} </td>
                    <td> {{ evaluacion.responsable }} </td>
                    <td> {{ evaluacion.puntaje }} </td>
                    <td> {{ evaluacion.comentario }} </td>
                    <td> {{ evaluacion.evaluador }} </td>
                    <td> {{ evaluacion.fecha }} </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { dateHelper } from '@/util/dateHelper'
import { useUsuarios } from '@/modulos/usuarios/controladores/useUsuarios';
import { useEvaluaciones } from '../controladores/useEvaluaciones';
import type { EvaluacionVista } from '../interfaces/evaluaciones-interface';
import { useServicios } from '@/modulos/servicios/controladores/useServicios';
import { useIncidencias } from '@/modulos/incidencias/controladores/useIncidencias';
const { traeUsuarios, usuarios: listaUsuarios} = useUsuarios();
const { traeServicios, servicios } = useServicios();
const { traeIncidencias, incidencias } = useIncidencias();
const { traeEvaluaciones, evaluaciones } = useEvaluaciones();
const { getFechaYHora } = dateHelper();

    let isAdmin = ref(false)
    let evaluacionesVista = ref<EvaluacionVista[]>([])

    // Cuando la página es visible y está cargada
    onMounted(async () => {
        // obtener usuario autenticado
        const usuarios = ref(JSON.parse(localStorage.getItem('usuario') || '{}'))
        if (usuarios.value.rol == 1){
            isAdmin.value = true
        }
        await traeEvaluaciones();
        await traeServicios();
        await traeIncidencias();
        await traeUsuarios();
        evaluacionesVista.value = evaluaciones.value.map(evaluacion => ({
            id: evaluacion.id,
            incidencia: muestraFolioIncidencia(evaluacion.servicio),
            responsable: muestraResponsableServicio(evaluacion.servicio),
            puntaje: evaluacion.puntuacion,
            comentario: evaluacion.comentario,
            evaluador: muestraEvaluador(evaluacion.evaluador),
            fecha: getFechaYHora(evaluacion.fecha)
        }))
    })

    const muestraFolioIncidencia = (servicioId: number) => {
        const servicio = servicios.value.find(servicio => servicio.id === servicioId);
        if (servicio) {
            const incidencia = incidencias.value.find(incidencia => incidencia.id === servicio.incidencia);
            if (incidencia) {
                return incidencia.folio;
            } else {
                return 'N/A';
            }
        } else {
            return 'N/A';
        }
    }

    const muestraResponsableServicio = (servicioId: number) => {
        const servicio = servicios.value.find(servicio => servicio.id === servicioId);
        if (servicio) {
            const usuario = listaUsuarios.value.find(usuario => usuario.id === servicio.responsable);
            if (usuario) {
                return usuario.nombre;
            } else {
                return 'N/A';
            }
        } else {
            return 'N/A';
        }
    }

    const muestraEvaluador = (evaluadorId: number) => {
        const usuario = listaUsuarios.value.find(usuario => usuario.id === evaluadorId);
        if (usuario) {
            return usuario.nombre;
        } else {
            return 'N/A';
        }
    }
    // load <--- carga, en memoria
    // mounted <--- cargada y se ve en pantalla
</script>

<style scoped>
    section{
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        margin-top: 20px;
    }
    .table-container {
        max-height: 800px;
        overflow-y: auto; /* Habilitar scroll vertical */
    }
    .centrado {
        text-align: center;
    }
    th{
        font-weight: bold;
    }
</style>