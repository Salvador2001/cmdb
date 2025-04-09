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
    <h4 :key="nombreDepartamento">Departamento: {{ isAdmin ? "Administrador" : nombreDepartamento }}</h4>
    <div class="table-container">
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
                <tr v-if="incidencias.length === 0">
                    <td class="centrado" colspan="7">Sin incidencias registradas</td>
                </tr>
                <tr v-else v-for="(incidencia, index) in incidenciasVista" :key="index">
                    <td>{{ incidencia.id }}</td>
                    <td>{{ incidencia.folio }}</td>
                    <td>{{ incidencia.descripcion }}</td>
                    <td>{{ incidencia.categoria }}</td>
                    <td>{{ incidencia.prioridad }}</td>
                    <td>{{ incidencia.estatus }}</td>
                    <td>{{ incidencia.fecha_creacion }}</td>
                    <td>{{ incidencia.configuracion }}</td>
                    <td>{{ incidencia.ubicacion }}</td>
                    <td class="centrado">
                        <div class="btn-group" role="group" aria-label="Basic outlined example">
                            <!-- <button type="button" class="btn btn-sm btn-outline-secondary" @click="verComponentes(configuracion.id)">
                                <i class="fa fa-microchip"></i>
                            </button> -->
                            <button type="button" class="btn btn-sm btn-outline-info">
                                <i class="fa fa-cogs"></i>
                            </button>
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
                <tr v-if="incidencias.length === 0">
                    <td class="centrado" colspan="7">Sin incidencias registradas</td>
                </tr>
                <tr v-else v-for="(incidencia, index) in incidenciasVista" :key="index">
                    <td>{{ incidencia.id }}</td>
                    <td>{{ incidencia.folio }}</td>
                    <td>{{ incidencia.descripcion }}</td>
                    <td>{{ incidencia.categoria }}</td>
                    <td>{{ incidencia.prioridad }}</td>
                    <td>{{ incidencia.estatus }}</td>
                    <td>{{ incidencia.fecha_creacion }}</td>
                    <td>{{ incidencia.configuracion }}</td>
                    <td>{{ incidencia.ubicacion }}</td>
                    <td class="centrado">
                        <div class="btn-group" role="group" aria-label="Basic outlined example">
                            <!-- <button type="button" class="btn btn-sm btn-outline-secondary" @click="verComponentes(configuracion.id)">
                                <i class="fa fa-microchip"></i>
                            </button> -->
                            <button type="button" class="btn btn-sm btn-outline-info">
                                <i class="fa fa-cogs"></i>
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
//import { useConfiguraciones } from '../controladores/useConfiguraciones'
import { useComponentes } from '@/modulos/componentes/controladores/useComponentes'
import { useUsuarios } from '@/modulos/usuarios/controladores/useUsuarios'
import { useDepartamentos } from '@/modulos/departamentos/controladores/useDepartamentos'
import { dateHelper } from '@/util/dateHelper'
import { useUbicacion } from '@/modulos/ubicacion/controladores/useUbicacion'
//import type { ConfiguracionVista } from '../interfaces/configuraciones-interface'
import { useIncidencias } from '../controladores/useIncidencias'
import type { IncidenciaVista } from '../interfaces/incidencias-interface'
import { useConfiguraciones } from '@/modulos/configuraciones/controladores/useConfiguraciones'
const { traeIncidencias, traeIncidenciasPorDepartamento, incidencias } = useIncidencias()
const { traeConfiguracionId, configuraciones } = useConfiguraciones()
//const { traeComponenteId, componentes } = useComponentes()
const { traeDepartamentoId, departamentos } = useDepartamentos()
const { traeUbicacionId, ubicaciones } = useUbicacion()
//const { usuarios } = useUsuarios()
const { getFechaYHora } = dateHelper();

    let isAdmin = ref(false)
    let vista = ref('')
    let nombreDepartamento = ref('')

    let incidenciasVista = ref<IncidenciaVista[]>([])

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
                configuracion: configuraciones.value[0].nombre,
                ubicacion: ubicaciones.value[0].nombre
            })
        }
    })

    // const getNombreUbicacion = async (id: number) => {
    //     await traeUbicacionId(id)
    //     return ubicaciones.value[0].nombre
    // }

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
        max-height: 400px;
        overflow-y: auto; /* Habilitar scroll vertical */
    }
    .centrado {
        text-align: center;
    }
</style>