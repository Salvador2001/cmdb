<template>
    <div class="container mt-5">
        <div class="card mb-5">
            <div class="card-header">
                <h4>Reportar Problema</h4>
            </div>
            <div v-if="mensaje == 1" class="alert alert-success" role="alert">
                Problema reportado con éxito
            </div>
            <div class="card-body">
                <Form @submit="onTodoBien">
                    <div class="mb-3">
                        Error conocido
                        <Field name="error_conocido" type="text" class="form-control" v-model="problema.error_conocido" />
                        <ErrorMessage name="error_conocido" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Causa raíz
                        <Field name="causa_raiz" type="text" class="form-control" v-model="problema.causa_raiz" />
                        <ErrorMessage name="causa_raiz" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Solución (si se conoce)
                        <Field name="solucion" as="textarea" type="text" class="form-control" v-model="problema.solucion" />
                        <ErrorMessage name="solucion" class="errorValidacion" />
                    </div>
                    <div class="mb-3">
                        Departamento
                        <Field name="departamento" as="select" class="form-control" v-model="problema.departamento">
                            <option value="" disabled>Seleccione un departamento...</option>
                            <option v-for="(departamento, index) in departamentos" :key="index" :value="departamento.id">
                                {{ departamento.nombre }}
                            </option>
                        </Field>
                        <ErrorMessage name="departamento" class="errorValidacion" />
                    </div>
                    <!-- <div class="mb-3">
                        Configuración
                        <Field name="configuracion" as="select" class="form-control" v-model="folio_incidencia">
                            <option value="" disabled>Seleccione un elemento de configuración...</option>
                            <option v-for="(configuracion, index) in configuracionesConServicio" :key="index" :value="configuracion.folio_incidencia">
                                {{ configuracion.folio_incidencia + ": " + configuracion.serial + " - " +configuracion.nombre }}
                            </option>
                        </Field>
                        <ErrorMessage name="configuracion" class="errorValidacion" />
                    </div> -->
                    <div class="mb-3">
                        <button class="btn btn-primary" type="submit">Subir reporte</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import { dateHelper } from '@/util/dateHelper';
import type { ProblemaAgregar } from '../interfaces/problemas-interface';
import { useProblemas } from '../controladores/useProblemas';
import { useDepartamentos } from '@/modulos/departamentos/controladores/useDepartamentos';
const { traeDepartamentos, departamentos } = useDepartamentos();
const { agregarProblema, mensaje } = useProblemas();
const { getFechaYHora } = dateHelper();


let usuario = ref();

let problema = ref<ProblemaAgregar>({
    folio: '',
    error_conocido: '',
    causa_raiz: '',
    solucion: '',
    estatus: '',
    prioridad: 'N/A',
    responsable: null,
    fecha_creacion: '',
    departamento: 0,
    autor: 0
});

onMounted(async () => {
    // obtener usuario autenticado
    usuario = ref(JSON.parse(localStorage.getItem('usuario') || '{}'));
    console.log(usuario.value.departamento);
    // if(usuario.value.rol == 1){
    //     await traeConfiguraciones()
    // }
    // else{
    //     await traeConfiguracionesPorDepartamento(usuario.value.departamento);
    //     console.log(configuraciones.value);
    // }
    await traeDepartamentos();
}); 

const onTodoBien = async () => {
    problema.value.fecha_creacion = getFechaYHora(new Date().toISOString());
    problema.value.estatus = 'Identificado';
    problema.value.autor = usuario.value.id;
    problema.value.folio = 'P-' + Math.floor(Math.random() * 1_000_000).toString().padStart(6, '0'); // TODO: Remover esta línea
    await agregarProblema(problema.value);
}
</script>

<style scoped>
    .errorValidacion {
        color: red;
        font-weight: bold;
    }
</style>