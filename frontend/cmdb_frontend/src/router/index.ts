import LoginVue from '@/modulos/auth/vistas/LoginVue.vue'
import SignUpVue from '@/modulos/auth/vistas/SignUpVue.vue'
import ConfiguracionesAgregarVue from '@/modulos/configuraciones/vistas/ConfiguracionesAgregarVue.vue'
import ConfiguracionesBorrarVue from '@/modulos/configuraciones/vistas/ConfiguracionesBorrarVue.vue'
import ConfiguracionesEditarVue from '@/modulos/configuraciones/vistas/ConfiguracionesEditarVue.vue'
import ConfiguracionesVue from '@/modulos/configuraciones/vistas/ConfiguracionesVue.vue'
import EvaluacionesAgregarVue from '@/modulos/evaluaciones/vistas/EvaluacionesAgregarVue.vue'
import IncidenciasAgregarVue from '@/modulos/incidencias/vistas/IncidenciasAgregarVue.vue'
import IncidenciasEditarVue from '@/modulos/incidencias/vistas/IncidenciasEditarVue.vue'
import IncidenciasVue from '@/modulos/incidencias/vistas/IncidenciasVue.vue'
import PersonalAgregarVue from '@/modulos/personal/vistas/PersonalAgregarVue.vue'
import PersonalBorrarVue from '@/modulos/personal/vistas/PersonalBorrarVue.vue'
import PersonalEditarVue from '@/modulos/personal/vistas/PersonalEditarVue.vue'
import PersonalVue from '@/modulos/personal/vistas/PersonalVue.vue'
import TestAPI from '@/modulos/personal/vistas/TestAPI.vue'
import BienvenidaVue from '@/modulos/principal/vistas/BienvenidaVue.vue'
import ProblemasAgregarVue from '@/modulos/problemas/vistas/ProblemasAgregarVue.vue'
import ProblemasEditarVue from '@/modulos/problemas/vistas/ProblemasEditarVue.vue'
import ProblemasVue from '@/modulos/problemas/vistas/ProblemasVue.vue'
import SolicitudesCambioAgregarVue from '@/modulos/solicitudesCambio/vistas/SolicitudesCambioAgregarVue.vue'
import SolicitudesCambioEditarVue from '@/modulos/solicitudesCambio/vistas/SolicitudesCambioEditarVue.vue'
import SolicitudesCambioVue from '@/modulos/solicitudesCambio/vistas/SolicitudesCambioVue.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BienvenidaVue,
    },
    {
      path: '/bienvenida',
      name: 'bienvenida',
      component: BienvenidaVue,
    },
    {
      path: '/registrar',
      name: 'registrar',
      component: SignUpVue,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginVue,
    },
    {
      path: '/configuraciones',
      name: 'configuraciones',
      component: ConfiguracionesVue,
    },
    {
      path: '/configuraciones/agregar',
      name: 'configuracionesagregar',
      component: ConfiguracionesAgregarVue,
    },
    {
      path: '/configuraciones/:id/editar',
      name: 'configuracioneseditar',
      component: ConfiguracionesEditarVue,
    },
    {
      path: '/configuraciones/:id/borrar',
      name: 'configuracionesborrar',
      component: ConfiguracionesBorrarVue,
    },
    {
      path: '/incidencias',
      name: 'incidencias',
      component: IncidenciasVue,
    },
    {
      path: '/incidencias/agregar',
      name: 'incidenciasagregar',
      component: IncidenciasAgregarVue,
    },
    {
      path: '/incidencias/:id/editar',
      name: 'incidenciaseditar',
      component: IncidenciasEditarVue,
    },
    {
      path: '/solicitudes-cambio',
      name: 'solicitudes-cambio',
      component: SolicitudesCambioVue
    },
    {
      path: '/solicitudes-cambio/agregar',
      name: 'solicitudes-cambio-agregar',
      component: SolicitudesCambioAgregarVue
    },
    {
      path: '/solicitudes-cambio/:id/editar',
      name: 'solicitudes-cambio-editar',
      component: SolicitudesCambioEditarVue
    },
    {
      path: '/problemas',
      name: 'problemas',
      component: ProblemasVue
    },
    {
      path: '/problemas/agregar',
      name: 'problemas-agregar',
      component: ProblemasAgregarVue
    },
    {
      path: '/problemas/:id/editar',
      name: 'problemas-editar',
      component: ProblemasEditarVue
    },
    {
      path: '/evaluaciones/agregar/:servicioId',
      name: 'evaluaciones-agregar',
      component: EvaluacionesAgregarVue
    },
    {
      path: '/personal',
      name: 'personal',
      component: PersonalVue,
    },
    {
      path: '/personal/agregar',
      name: 'personalagregar',
      component: PersonalAgregarVue,
    },
    {
      path: '/personal/:id/editar',
      name: 'personaleditar',
      component: PersonalEditarVue,
    },
    {
      path: '/personal/:id/borrar',
      name: 'personalborrar',
      component: PersonalBorrarVue,
    },
    {
      path: '/test-api',
      component: TestAPI
    }
  ],
})

export default router
