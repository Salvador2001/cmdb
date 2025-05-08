<template>
    <section>
        <h3></h3>
        <h3>RFCs</h3>
        <div>
            <!-- <RouterLink :to="{path: '/rfc/agregar'}">
                <button class="btn btn-sm btn-outline-primary">
                    Solicitar RFC <i class="fa fa-plus"></i>
                </button>
            </RouterLink> -->
        </div>
    </section>
    <!-- <h5 :key="nombreDepartamento">Departamento: {{ isAdmin ? "Administrador" : nombreDepartamento }}</h5> -->
    <ul class="nav nav-tabs nav-fill">
        <li class="nav-item">
            <a class="nav-link" :class="{ active: tabActiva === 'pendientes' }" aria-current="page" href="#" @click=" onTabSwitch('pendientes') ">Pendientes</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" :class="{ active: tabActiva === 'aceptadas' }" href="#" @click=" onTabSwitch('aceptadas') ">Aceptadas</a>
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
                    <th>Incidencia</th>
                    <th>Descripcion</th>
                    <th>Estatus</th>
                    <th>Presupuesto</th>
                    <th>Configuración</th>
                    <th>Fecha de solicitud</th>
                    <th>Requiere comité</th>
                    <th>Ubicación</th>
                    <th></th>
                </tr>
            </thead>
            <tbody v-if="isAdmin == true">
                <tr v-if="solicitudesVistaCategorizadas.length === 0">
                    <td class="centrado" colspan="10">Sin RFCs registrados</td>
                </tr>
                <tr v-else v-for="(solicitud, index) in solicitudesVistaCategorizadas" :key="index">
                    <td>{{ solicitud.id }}</td>
                    <td>{{ solicitud.incidencia }}</td>
                    <td>{{ solicitud.descripcion }}</td>
                    <td>{{ solicitud.estatus }}</td>
                    <td>{{ solicitud.presupuesto }}</td>
                    <td>{{ solicitud.configuracion }}</td>
                    <td>{{ solicitud.fecha }}</td>
                    <td>{{ solicitud.requiere_comite ? "SI" : "NO" }}</td>
                    <td>{{ solicitud.ubicacion }}</td>
                    <td class="centrado">
                        <div class="btn-group" role="group" aria-label="Basic outlined example">
                            <!-- <button type="button" class="btn btn-sm btn-outline-secondary" @click="verComponentes(configuracion.id)">
                                <i class="fa fa-microchip"></i>
                            </button> -->
                            <!-- <button type="button" class="btn btn-sm btn-outline-info">
                                <i class="fa fa-cogs"></i>
                            </button> -->
                            <button v-if="isAdmin == true" type="button" class="btn btn-sm btn-outline-primary">
                                <RouterLink class="nav-link item" :to="{path: '/solicitudes-cambio/' + solicitud.id + '/editar'}"><i class="fa fa-pencil"></i></RouterLink>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { dateHelper } from '@/util/dateHelper'
import { useSolicitudesCambio } from '../controladores/useSolicitudesCambio'
import type { SolicitudCambioVista } from '../interfaces/solicitudesCambio-interface'
const { traeSolicitudesCambioVista, solicitudesCambioVista } = useSolicitudesCambio()
const { getFechaYHora } = dateHelper();

    let isAdmin = ref(false)
    let tabActiva = ref('pendientes')
    let solicitudesVistaCategorizadas = ref<SolicitudCambioVista[]>([])

    // Cuando la página es visible y está cargada
    onMounted(async () => {
        // obtener usuario autenticado
        const usuarios = ref(JSON.parse(localStorage.getItem('usuario') || '{}'))
        if (usuarios.value.rol == 1){
            isAdmin.value = true
            await traeSolicitudesCambioVista()
        }
        solicitudesCambioVista.value.forEach((solicitud) => {
            solicitud.fecha = getFechaYHora(solicitud.fecha);
        })
        solicitudesVistaCategorizadas.value = solicitudesCambioVista.value.filter(solicitud => solicitud.estatus === 'Pendiente')

        console.log('solicitudesCambioVista', solicitudesCambioVista.value)
    })

    const onTabSwitch = (tab: string) => {
        tabActiva.value = tab
        if (tab === 'pendientes') {
            solicitudesVistaCategorizadas.value = solicitudesCambioVista.value.filter(solicitud => solicitud.estatus === 'Pendiente')
        } else if (tab === 'aceptadas') {
            solicitudesVistaCategorizadas.value = solicitudesCambioVista.value.filter(solicitud => solicitud.estatus === 'Aceptada')
        } else if (tab === 'rechazadas') {
            solicitudesVistaCategorizadas.value = solicitudesCambioVista.value.filter(solicitud => solicitud.estatus === 'Rechazada')
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