<template>
    <section>
        <h3></h3>
        <h3>Personal</h3>
        <div>
            <RouterLink :to="{path: '/personal/agregar'}">
                <button class="btn btn-sm btn-outline-primary">
                    Agregar <i class="fa fa-plus"></i>
                </button>
            </RouterLink>
        </div>
    </section>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Clave</th>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Estatus</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="personal.length === 0">
                <td class="centrado" colspan="6">Sin personal registrado</td>
            </tr>
            <tr v-else v-for="(persona,index) in personal" :key="index">
                <td>{{ persona.id }}</td>
                <td>{{ persona.nombre }}</td>
                <td>{{ persona.direccion }}</td>
                <td>{{ persona.telefono }}</td>
                <td>{{ persona.estatus }}</td>
                <td class="centrado">
                    <div class="btn-group" role="group" aria-label="Basic outlined example">
                        <button type="button" class="btn btn-sm btn-outline-primary">
                            <RouterLink class="nav-link item" :to="{path: '/personal/' + persona.id + '/editar'}"><i class="fa fa-pencil"></i></RouterLink>
                        </button>
                        <button type="button" class="btn btn-sm btn-outline-danger">
                            <RouterLink class="nav-link item" :to="{path: '/personal/' + persona.id + '/borrar'}"><i class="fa fa-trash"></i></RouterLink>
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
    import { onMounted } from 'vue'
    import { usePersonal } from '../controladores/usePersonal.ts'
    const { traePersonal, personal } = usePersonal()

    // Cuando la página es visible y está cargada
    onMounted(async () => {
        await traePersonal()
    })

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
    .centrado {
        text-align: center;
    }
</style>