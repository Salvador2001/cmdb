<template>
    <div class="container mt-5" v-if="solicitudesCambio[0]">
        <div class="card mb-5">
            <div class="card-header">
                <h4>Editar RFC</h4>
            </div>
            <div v-if="solicitudesCambio[0].requiere_comite == true" class="alert alert-danger" role="alert">
                Esta solicitud de cambio requiere la aprobación del comité
            </div>
            <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                Solicitud de cambio actualizada con éxito
            </div>
            <div class="card-body">
                <div class="mb-3">
                    Id
                    <input type="text" class="form-control" v-model="solicitudesCambio[0].id" disabled>
                </div>
                <div class="mb-3">
                    Presupuesto
                    <input type="text" disabled class="form-control" v-model="solicitudesCambio[0].presupuesto">
                </div>
                <div class="mb-3">
                    Descripción
                    <textarea class="form-control" disabled v-model="solicitudesCambio[0].descripcion"></textarea>
                </div>
                <div class="mb-3">
                    Estatus
                    <select class="form-control" :disabled="solicitudesCambio[0].requiere_comite == true" v-model="solicitudesCambio[0].estatus">
                        <option value="" disabled>Seleccione un estatus...</option>
                        <option v-for="(estatus, index) in estatusList" :key="index" :value="estatus.nombre">
                            {{ estatus.nombre }}
                        </option>
                    </select>
                </div>
                <div class="mb-3">
                    Configuración
                    <input type="text" disabled class="form-control" v-if="configuraciones[0]" v-model="configuraciones[0].serial">
                </div>
                <div class="mb-3">
                    <button :class="{ disabled: solicitudesCambio[0].requiere_comite == true }" class="btn btn-primary" @click="onActualizar(solicitudesCambio[0])">Actualizar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useConfiguraciones } from '@/modulos/configuraciones/controladores/useConfiguraciones';
import { dateHelper } from '@/util/dateHelper';
import { useSolicitudesCambio } from '../controladores/useSolicitudesCambio';
import type { SolicitudCambio } from '../interfaces/solicitudesCambio-interface';

const { traeConfiguraciones, traeConfiguracionPorRFC, configuraciones } = useConfiguraciones();
const { traeSolicitudCambioId, actualizarSolicitudCambio, mensaje, solicitudesCambio } = useSolicitudesCambio();
const { getFechaYHora } = dateHelper();

const route = useRoute();
let idRFC = 0;
let isAdmin = ref(false);
let isTecnico = ref(false);

const estatusList = [
    { id: 1, nombre: 'Pendiente' },
    { id: 2, nombre: 'Aceptada' },
    { id: 3, nombre: 'Rechazada' },
];

onMounted(async () => {
    const usuarioAuth = ref(JSON.parse(localStorage.getItem('usuario') || '{}'))
    if (usuarioAuth.value.rol == 1){
        isAdmin.value = true
        isTecnico.value = true
    } else if (usuarioAuth.value.rol == 3){
        isTecnico.value = true
    }
    idRFC = Number(route.params.id);
    await traeSolicitudCambioId(idRFC);
    await traeConfiguracionPorRFC(idRFC);
    solicitudesCambio.value[0].fecha = getFechaYHora(solicitudesCambio.value[0].fecha);
    console.log("solicitud")
    console.log(solicitudesCambio.value[0]);
    console.log("configuracion")
    console.log(configuraciones.value[0]);
});


const onActualizar = async (rfc: SolicitudCambio) => {
    // mensaje.value = 0;
    await actualizarSolicitudCambio(rfc);
};

</script>

<style scoped>
</style>