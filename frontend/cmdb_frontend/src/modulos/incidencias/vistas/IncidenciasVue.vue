<template>
    <section>
        <h3></h3>
        <h3>Incidencias</h3>
        <div>
            <RouterLink :to="{path: '/incidencias/agregar'}">
                <button class="btn btn-sm btn-outline-primary">
                    Crear reporte <i class="fa fa-plus"></i>
                </button>
            </RouterLink>
        </div>
    </section>
    <h5 :key="nombreDepartamento">Departamento: {{ isAdmin ? "Administrador" : nombreDepartamento }}</h5>
    <ul class="nav nav-tabs nav-fill">
        <li class="nav-item">
            <a class="nav-link" :class="{ active: tabActiva === 'abiertas' }" aria-current="page" href="#" @click=" onTabSwitch('abiertas') ">Abiertas</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" :class="{ active: tabActiva === 'enProceso' }" href="#" @click=" onTabSwitch('enProceso') ">En Proceso</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" :class="{ active: tabActiva === 'terminadas' }" href="#" @click=" onTabSwitch('terminadas') ">Terminadas</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" :class="{ active: tabActiva === 'liberadas' }" href="#" @click=" onTabSwitch('liberadas') ">Liberadas</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" :class="{ active: tabActiva === 'rechazadas' }" href="#" @click=" onTabSwitch('rechazadas') ">Rechazadas</a>
        </li>
    </ul>
    <div class="table-container mb-5">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Folio</th>
                    <th>Descripcion</th>
                    <th>Categoría</th>
                    <th>Prioridad</th>
                    <th>Estatus</th>
                    <th>Fecha de creacion</th>
                    <th>Configuracion</th>
                    <th>Ubicación</th>
                    <th></th>
                </tr>
            </thead>
            <tbody v-if="isAdmin == true">
                <tr v-if="incidenciasVistaCategorizadas.length === 0">
                    <td class="centrado" colspan="10">Sin incidencias registradas</td>
                </tr>
                <tr v-else v-for="(incidencia, index) in incidenciasVistaCategorizadas" :key="index">
                    <td>{{ incidencia.id }}</td>
                    <td>{{ incidencia.folio }}</td>
                    <td>{{ incidencia.descripcion }}</td>
                    <td>{{ incidencia.categoria }}</td>
                    <td :class="{
                    'table-danger': incidencia.prioridad === 'Alta',
                    'table-warning': incidencia.prioridad === 'Media',
                    'table-success': incidencia.prioridad === 'Baja'
                    }">
                    {{ incidencia.prioridad }}
                    </td>
                    <td>{{ incidencia.estatus }}</td>
                    <td>{{ incidencia.fecha_creacion }}</td>
                    <td>{{ incidencia.configuracion }}</td>
                    <td>{{ incidencia.ubicacion }}</td>
                    <td class="centrado">
                        <div class="btn-group" role="group" aria-label="Basic outlined example">
                            <!-- <button type="button" class="btn btn-sm btn-outline-secondary" @click="verComponentes(configuracion.id)">
                                <i class="fa fa-microchip"></i>
                            </button> -->
                            <!-- <button type="button" class="btn btn-sm btn-outline-info">
                                <i class="fa fa-cogs"></i>
                            </button> -->
                            <button v-if="isAdmin == true" type="button" class="btn btn-sm btn-outline-primary">
                                <RouterLink class="nav-link item" :to="{path: '/incidencias/' + incidencia.id + '/editar'}"><i class="fa fa-pencil"></i></RouterLink>
                            </button>
                            <!-- <button v-if="isAdmin == true" type="button" class="btn btn-sm btn-outline-danger">
                                <RouterLink class="nav-link item" :to="{path: '/incidencias/' + incidencia.id + '/borrar'}"><i class="fa fa-trash"></i></RouterLink>
                            </button> -->
                        </div>
                    </td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr v-if="incidenciasVistaCategorizadas.length === 0">
                    <td class="centrado" colspan="10">Sin incidencias registradas</td>
                </tr>
                <tr v-else v-for="(incidencia, index) in incidenciasVistaCategorizadas" :key="index">
                    <td>{{ incidencia.id }}</td>
                    <td>{{ incidencia.folio }}</td>
                    <td>{{ incidencia.descripcion }}</td>
                    <td>{{ incidencia.categoria }}</td>
                    <td :class="{
                    'table-danger': incidencia.prioridad === 'Alta',
                    'table-warning': incidencia.prioridad === 'Media',
                    'table-success': incidencia.prioridad === 'Baja'
                    }">
                    {{ incidencia.prioridad }}
                    </td>
                    <td>{{ incidencia.estatus }}</td>
                    <td>{{ incidencia.fecha_creacion }}</td>
                    <td>{{ incidencia.configuracion }}</td>
                    <td>{{ incidencia.ubicacion }}</td>
                    <td class="centrado">
                        <div class="btn-group" role="group" aria-label="Basic outlined example">
                            <button type="button" class="btn btn-sm btn-outline-primary">
                                <RouterLink class="nav-link item" :to="{path: '/incidencias/' + incidencia.id + '/editar'}"><i class="fa fa-pencil"></i></RouterLink>
                            </button>
                            <!-- <button type="button" class="btn btn-sm btn-outline-secondary" @click="verComponentes(configuracion.id)">
                                <i class="fa fa-microchip"></i>
                            </button> -->
                            <!-- <button type="button" class="btn btn-sm btn-outline-info">
                                <i class="fa fa-cogs"></i>
                            </button> -->
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
//import { useConfiguraciones } from '../controladores/useConfiguraciones'
import { useComponentes } from '@/modulos/componentes/controladores/useComponentes'
import { useUsuarios } from '@/modulos/usuarios/controladores/useUsuarios'
import { useDepartamentos } from '@/modulos/departamentos/controladores/useDepartamentos'
import { dateHelper } from '@/util/dateHelper'
import { useUbicacion } from '@/modulos/ubicacion/controladores/useUbicacion'
//import type { ConfiguracionVista } from '../interfaces/configuraciones-interface'
import { useIncidencias } from '../controladores/useIncidencias'
import type { Incidencia, IncidenciaVista } from '../interfaces/incidencias-interface'
import { useConfiguraciones } from '@/modulos/configuraciones/controladores/useConfiguraciones'
import { useServicios } from '@/modulos/servicios/controladores/useServicios'
const { traeIncidencias, traeIncidenciaId, traeIncidenciasPorDepartamento, incidencias } = useIncidencias()
const { traeConfiguracionId, configuraciones } = useConfiguraciones()
//const { traeComponenteId, componentes } = useComponentes()
const { traeDepartamentoId, departamentos } = useDepartamentos()
const { traeUbicacionId, ubicaciones } = useUbicacion()
//const { usuarios } = useUsuarios()
const { traeServicioResponsable, servicios} = useServicios();
const { getFechaYHora } = dateHelper();

    let isAdmin = ref(false)
    let tabActiva = ref('abiertas')
    let nombreDepartamento = ref('')

    let incidenciasVista = ref<IncidenciaVista[]>([])
    let incidenciasVistaCategorizadas = ref<IncidenciaVista[]>([])

    // Cuando la página es visible y está cargada
    onMounted(async () => {
        // obtener usuario autenticado
        const usuarios = ref(JSON.parse(localStorage.getItem('usuario') || '{}'))
        if (usuarios.value.rol == 1){
            isAdmin.value = true
            await traeIncidencias()
        }
        else if(usuarios.value.rol == 3){
            await traeIncidencias()
            await traeServicioResponsable(usuarios.value.id)
            if (servicios.value != null) {
                let listaIncidenciasAsignadas = ref<Incidencia[]>([])
                for (const servicio of servicios.value) {
                    await traeIncidenciaId(servicio.incidencia)
                    listaIncidenciasAsignadas.value.push(incidencias.value[0])
                }
                incidencias.value = listaIncidenciasAsignadas.value
            }
            else{
                incidencias.value = []
            }
        }
        else{
            await traeIncidenciasPorDepartamento(usuarios.value.departamento)
            await traeDepartamentoId(usuarios.value.departamento)
            nombreDepartamento.value = departamentos.value[0].nombre
        }
        incidencias.value.forEach((incidencia) => {
            incidencia.fecha_creacion = getFechaYHora(incidencia.fecha_creacion);
        })

        for (const incidencia of incidencias.value) {
            await traeConfiguracionId(incidencia.configuracion)
            if (configuraciones.value[0].ubicacion != null) {
                await traeUbicacionId(configuraciones.value[0].ubicacion)
            } else {
                configuraciones.value[0].ubicacion = null
            }
            incidenciasVista.value.push({
                id: incidencia.id,
                folio: incidencia.folio,
                descripcion: incidencia.descripcion,
                categoria: incidencia.categoria,
                prioridad: incidencia.prioridad,
                estatus: incidencia.estatus,
                fecha_creacion: incidencia.fecha_creacion,
                configuracion: configuraciones.value[0].serial + " - " + configuraciones.value[0].nombre,
                ubicacion: ubicaciones.value[0].nombre
            })
        }
        incidenciasVistaCategorizadas.value = incidenciasVista.value.filter(incidencia => incidencia.estatus === 'Abierta')
    })

    const onTabSwitch = (tab: string) => {
        incidenciasVistaCategorizadas.value = incidenciasVista.value
        tabActiva.value = tab
        if (tab === 'abiertas') {
            incidenciasVistaCategorizadas.value = incidenciasVista.value.filter(incidencia => incidencia.estatus === 'Abierta')
        } else if (tab === 'enProceso') {
            incidenciasVistaCategorizadas.value = incidenciasVista.value.filter(incidencia => incidencia.estatus === 'En Proceso')
        } else if (tab === 'terminadas') {
            incidenciasVistaCategorizadas.value = incidenciasVista.value.filter(incidencia => incidencia.estatus === 'Terminada')
        } else if (tab === 'liberadas') {
            incidenciasVistaCategorizadas.value = incidenciasVista.value.filter(incidencia => incidencia.estatus === 'Liberada')
        } else if (tab === 'rechazadas') {
            incidenciasVistaCategorizadas.value = incidenciasVista.value.filter(incidencia => incidencia.estatus === 'Rechazada')
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