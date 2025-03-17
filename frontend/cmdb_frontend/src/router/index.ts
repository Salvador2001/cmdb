import PersonalVue from '@/modulos/personal/vistas/PersonalVue.vue'
import TestAPI from '@/modulos/personal/vistas/TestAPI.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView,
    // }
    {
      path: '/personal',
      name: 'personal',
      component: PersonalVue,
    },
    {
      path: '/test-api',
      component: TestAPI
    }
  ],
})

export default router
