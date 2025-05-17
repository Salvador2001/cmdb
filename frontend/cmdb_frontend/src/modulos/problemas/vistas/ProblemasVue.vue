<template>
    <section>
        <h3></h3>
        <h3>Gestión de Problemas</h3>
        <div>
            <RouterLink v-if=" isAdmin " :to="{path: '/problemas/agregar'}">
                <button class="btn btn-sm btn-outline-primary">
                    Reportar Problema <i class="fa fa-plus"></i>
                </button>
            </RouterLink>
        </div>
    </section>
    <!-- <h5 :key="nombreDepartamento">Departamento: {{ isAdmin ? "Administrador" : nombreDepartamento }}</h5> -->
    <ul class="nav nav-tabs nav-fill">
        <li class="nav-item">
            <a class="nav-link" :class="{ active: tabActiva === 'identificados' }" aria-current="page" href="#" @click=" onTabSwitch('identificados') ">Identificados</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" :class="{ active: tabActiva === 'enProceso' }" href="#" @click=" onTabSwitch('enProceso') ">En Proceso</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" :class="{ active: tabActiva === 'resueltos' }" href="#" @click=" onTabSwitch('resueltos') ">Resueltos</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" :class="{ active: tabActiva === 'liberados' }" href="#" @click=" onTabSwitch('liberados') ">Liberados</a>
        </li>
    </ul>
    <div class="table-container mb-5">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Folio</th>
                    <th>Error conocido</th>
                    <th>Estatus</th>
                    <th>Prioridad</th>
                    <th>Fecha de solicitud</th>
                    <th>Departamento</th>
                    <th>Responsable</th>
                    <th></th>
                </tr>
            </thead>
            <tbody v-if="isAdmin == true || isTecnico == true">
                <tr v-if="listaProblemasCategorizados.length === 0">
                    <td class="centrado" colspan="10">Sin problemas registrados</td>
                </tr>
                <tr v-else v-for="(problema, index) in listaProblemasCategorizados" :key="index">
                    <td> {{ problema.id }} </td>
                    <td> {{ problema.folio }} </td>
                    <td> {{ problema.error_conocido }} </td>
                    <td> {{ problema.estatus }} </td>
                    <td :class="{
                    'table-danger': problema.prioridad === 'Alta',
                    'table-warning': problema.prioridad === 'Media',
                    'table-success': problema.prioridad === 'Baja'
                    }">
                    {{ problema.prioridad }}
                    </td>
                    <td> {{ problema.fecha_creacion }} </td>
                    <td> {{ muestraDepartamento(problema.departamento) }} </td>
                    <td> {{ muestraResponsable(problema.responsable || 0) }} </td>
                    <td class="centrado">
                        <div class="btn-group" role="group" aria-label="Basic outlined example">
                            <!-- <button type="button" class="btn btn-sm btn-outline-secondary" @click="verComponentes(configuracion.id)">
                                <i class="fa fa-microchip"></i>
                            </button> -->
                            <!-- <button type="button" class="btn btn-sm btn-outline-info">
                                <i class="fa fa-cogs"></i>
                            </button> -->
                            <button v-if="isAdmin || isTecnico" type="button" class="btn btn-sm btn-outline-primary">
                                <RouterLink class="nav-link item" :to="{path: '/problemas/' + problema.id + '/editar'}"><i class="fa fa-pencil"></i></RouterLink>
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
import { useProblemas } from '../controladores/useProblemas';
import type { Problema } from '../interfaces/problemas-interface';
import { useDepartamentos } from '@/modulos/departamentos/controladores/useDepartamentos';
import { useUsuarios } from '@/modulos/usuarios/controladores/useUsuarios';
const { traeProblemas, problemas } = useProblemas();
const { traeDepartamentoId, departamentos } = useDepartamentos();
const { traeUsuarioId, usuarios: nombreResponsable} = useUsuarios();
const { getFechaYHora } = dateHelper();

    let isAdmin = ref(false)
    let isTecnico = ref(false)
    let tabActiva = ref('identificados')
    let listaProblemasCategorizados = ref<Problema[]>([])

    // Cuando la página es visible y está cargada
    onMounted(async () => {
        // obtener usuario autenticado
        const usuarios = ref(JSON.parse(localStorage.getItem('usuario') || '{}'))
        if (usuarios.value.rol == 1){
            isAdmin.value = true
        } 
        else if (usuarios.value.rol == 9){
            isTecnico.value = true
        }
        await traeProblemas();
        listaProblemasCategorizados.value.forEach((problema) => {
            problema.fecha_creacion = getFechaYHora(problema.fecha_creacion);
        })
        listaProblemasCategorizados.value = problemas.value.filter(problema => problema.estatus === 'Identificado')

        console.log('listaProblemasCategorizados', listaProblemasCategorizados.value)
    })

    const onTabSwitch = (tab: string) => {
        tabActiva.value = tab
        if (tab === 'identificados') {
            listaProblemasCategorizados.value = problemas.value.filter(problema => problema.estatus === 'Identificado')
        } else if (tab === 'enProceso') {
            listaProblemasCategorizados.value = problemas.value.filter(problema => problema.estatus === 'En Proceso')
        } else if (tab === 'resueltos') {
            listaProblemasCategorizados.value = problemas.value.filter(problema => problema.estatus === 'Resuelto')
        } else if (tab === 'liberados') {
            listaProblemasCategorizados.value = problemas.value.filter(problema => problema.estatus === 'Liberado')
        }
    }

    const muestraDepartamento = (departamentoId: number) => {
        traeDepartamentoId(departamentoId)
        return departamentos.value.find(departamento => departamento.id === departamentoId)?.nombre || 'N/A'
    }

    const muestraResponsable = (responsableId: number) => {
        traeUsuarioId(responsableId)
        return nombreResponsable.value.find(usuario => usuario.id === responsableId)?.nombre || 'N/A'
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