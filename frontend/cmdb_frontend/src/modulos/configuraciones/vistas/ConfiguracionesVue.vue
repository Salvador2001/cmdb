<template>
    <section>
        <h3></h3>
        <h3>Configuraciones</h3>
        <div>
            <RouterLink :to="{path: '/configuraciones/agregar'}">
                <button v-if="isAdmin == true" class="btn btn-sm btn-outline-primary">
                    Agregar <i class="fa fa-plus"></i>
                </button>
            </RouterLink>
        </div>
    </section>
    <h4 :key="nombreDepartamento">Departamento: {{ nombreDepartamento }}</h4>
    <div class="table-container">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Fabricante</th>
                    <th>Tipo</th>
                    <th>Estatus</th>
                    <th>Ubicación</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="configuraciones.length === 0">
                    <td class="centrado" colspan="7">Sin configuraciones registradas</td>
                </tr>
                <tr v-else v-for="(configuracion, index) in configuraciones" :key="index">
                    <td>{{ configuracion.id }}</td>
                    <td>{{ configuracion.nombre }}</td>
                    <td>{{ configuracion.fabricante }}</td>
                    <td>{{ configuracion.tipo }}</td>
                    <td>{{ configuracion.estatus }}</td>
                    <td>{{ configuracion.ubicacion }}</td>
                    <td class="centrado">
                        <div class="btn-group" role="group" aria-label="Basic outlined example">
                            <button type="button" class="btn btn-sm btn-outline-secondary" @click="verComponentes(configuracion.id)">
                                <i class="fa fa-microchip"></i>
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-info">
                                <i class="fa fa-cogs"></i>
                            </button>
                            <button v-if="isAdmin == true" type="button" class="btn btn-sm btn-outline-primary">
                                <RouterLink class="nav-link item" :to="{path: '/configuraciones/' + configuracion.id + '/editar'}"><i class="fa fa-pencil"></i></RouterLink>
                            </button>
                            <button v-if="isAdmin == true" type="button" class="btn btn-sm btn-outline-danger">
                                <RouterLink class="nav-link item" :to="{path: '/configuraciones/' + configuracion.id + '/borrar'}"><i class="fa fa-trash"></i></RouterLink>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <section class="section-componentes">
        <h4>Componentes</h4>
    </section>
    <div class="table-container">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Fabricante</th>
                    <th>Tipo</th>
                    <th>Estatus</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="componentes.length === 0">
                    <td class="centrado" colspan="6">Sin componentes registrados</td>
                </tr>
                <tr v-else v-for="(componentes, index) in componentes" :key="index">
                    <td>{{ componentes.id }}</td>
                    <td>{{ componentes.nombre }}</td>
                    <td>{{ componentes.fabricante }}</td>
                    <td>{{ componentes.tipo }}</td>
                    <td>{{ componentes.estatus }}</td>
                    <td class="centrado">
                        <div class="btn-group" role="group" aria-label="Basic outlined example">
                            
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useConfiguraciones } from '../controladores/useConfiguraciones'
import { useComponentes } from '@/modulos/componentes/controladores/useComponentes'
import { useUsuarios } from '@/modulos/usuarios/controladores/useUsuarios'
import { useDepartamentos } from '@/modulos/departamentos/controladores/useDepartamentos'
const { traeConfiguraciones, traeConfiguracionesPorDepartamento, configuraciones } = useConfiguraciones()
const { traeComponenteId, componentes } = useComponentes()
const { traeDepartamentoId, departamentos } = useDepartamentos()
//const { usuarios } = useUsuarios()

    let isAdmin = ref(false)
    let vista = ref('')
    let nombreDepartamento = ref('')

    // Cuando la página es visible y está cargada
    onMounted(async () => {
        // obtener usuario autenticado
        const usuarios = ref(JSON.parse(localStorage.getItem('usuario') || '{}'))
        if (usuarios.value.rol == 1){
            console.log("entró y ahora sale rol")
            console.log(usuarios.value.rol)
            isAdmin.value = true
            await traeConfiguraciones()
        }
        else{
            console.log("sale rol especifico")
            console.log(usuarios.value.rol)
            await traeConfiguracionesPorDepartamento(usuarios.value.departamento)
            await traeDepartamentoId(usuarios.value.departamento)
            nombreDepartamento.value = departamentos.value[0].nombre
        }
    })

    const verComponentes = async (id: number) => {
        vista.value = 'componentes'
        await traeComponenteId(id)
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
    .section-componentes{
        justify-content: left;
        padding-left: 20px;
        background-color: #f0f0f0;
        border: #d6d6d6 1px solid;
    }
    .table-container {
        max-height: 400px;
        overflow-y: auto; /* Habilitar scroll vertical */
    }
    .centrado {
        text-align: center;
    }
</style>