<template>
    <section>
        <h3></h3>
        <h3>Personal</h3>
        <div>opciones</div>
    </section>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Clave</th>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Estatus</th>
            </tr>
        </thead>
        <tbody>
            <td>Clave</td>
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

</style>