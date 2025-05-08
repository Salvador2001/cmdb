<!-- vbase-3-ts-setup para obtener template con vue snippets -->
<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="/bienvenida">TEC CMDB</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                   <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item margin">
                            <!-- <RouterLink class="nav-link item" to="/personal">Personal</RouterLink> -->
                        </li>
                        <li v-if="authed" class="nav-item margin">
                            <RouterLink class="nav-link item" to="/configuraciones">Configuraciones</RouterLink>
                        </li>
                        <li v-if="authed" class="nav-item margin">
                            <RouterLink class="nav-link item" to="/incidencias">Incidencias</RouterLink>
                        </li>
                        <li v-if="authed && isAdmin" class="nav-item margin">
                            <RouterLink class="nav-link item" to="/solicitudes-cambio">RFCs</RouterLink>
                        </li>
                   </ul>
                </div>
            </div>
        </div>
        <div class="auth container-fluid">
            <div class="auth" v-if="authed">
                <p class="text-light me-2">Bienvenido(a), {{ nombreUsuario }}</p>
                <button class="btn btn-outline-light" @click="logout" title="Salir"><i class="fa fa-user-times"></i></button>
            </div>
            <div v-else>
                <RouterLink class="btn btn-outline-light" to="/login"><i class="fa fa-user-plus"></i></RouterLink>
            </div>
        </div>
    </nav>
    
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';


    const router = useRouter()
    const authed = ref(false);
    let nombreUsuario = ref('');
    let isAdmin = ref(false);

    onMounted(() => {
        //Verificar si ya hay un usuario autenticado
        if (localStorage.getItem('usuario') && localStorage.getItem('credencial')) {
            authed.value = true
            const usuarios = ref(JSON.parse(localStorage.getItem('usuario') || '{}'))
            nombreUsuario.value = usuarios.value.nombre
        }

        //Verificar si el usuario es administrador
        if (localStorage.getItem('usuario')) {
            const usuarios = ref(JSON.parse(localStorage.getItem('usuario') || '{}'))
            if (usuarios.value.rol == 1) {
                isAdmin.value = true
            }
        }
    })

    const logout = () => {
        localStorage.removeItem('usuario');
        localStorage.removeItem('credencial');
        authed.value = false;
        router.push('/bienvenida');
    }
</script>

<style scoped>
.auth{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;
}
.auth p{
    margin: 0;
}
</style>