import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // Admin
  {
    path: '/admin',
    name: 'admin',
    component: () => import( '../views/Admin/AdminLogin.vue')
  },
  {
    path: '/admin/MenuMeadela',
    name: 'adminMenuMeadela',
    component: () => import( '../views/Admin/MenuPrincipalMeadela.vue')
  },

  {
    path: '/admin/MenuOrtho',
    name: 'adminMenuOrtho',
    component: () => import( '../views/Admin/MenuPrincipalOrtho.vue')
  },
  {
    path: '/admin/MenuFisio',
    name: 'adminMenuFisio',
    component: () => import( '../views/Admin/MenuPrincipalFisio.vue')
  },
  // MeadelaGym
  {
    path: '/meadelaGym',
    name: 'MeadelaGym',
    component: () => import( '../views/MeadelaGym/Home.vue')
  },
  {
    path: '/meadelaGym/Servicos',
    name: 'MeadelaGymServicos',
    component: () => import( '../views/MeadelaGym/Servicos.vue')
  },
  {
    path: '/meadelaGym/MapaAulas',
    name: 'MeadelaGymMapaAulas',
    component: () => import( '../views/MeadelaGym/MapaAulas.vue')
  },
  {
    path: '/meadelaGym/Sobre',
    name: 'MeadelaGymSobre',
    component: () => import( '../views/MeadelaGym/Sobre.vue')
  },
  {
    path: '/meadelaGym/Contactos',
    name: 'MeadelaGymContactos',
    component: () => import( '../views/MeadelaGym/Contactos.vue')
  },
  // FisioGym
  {
    path: '/fisioGym',
    name: 'FisioGym',
    component: () => import( '../views/FisioGym/Home.vue')
  },
  {
    path: '/fisioGym/Servicos',
    name: 'FisioGymServicos',
    component: () => import( '../views/FisioGym/Servicos.vue')
  },
  {
    path: '/fisioGym/Sobre',
    name: 'FisioGymSobre',
    component: () => import( '../views/FisioGym/Sobre.vue')
  },
  {
    path: '/fisioGym/Contactos',
    name: 'FisioGymContactos',
    component: () => import( '../views/FisioGym/Contactos.vue')
  },
  // OrthoGym
  {
    path: '/orthoGym',
    name: 'OrthoGym',
    component: () => import( '../views/OrthoGym/Home.vue')
  },
  { 
    path: '/orthoGym/Servicos',
    redirect: '/orthoGym/Servicos/0' 
  },
  {
    path: '/orthoGym/Servicos/:id(\\d+)',
    name: 'OrthoGymServicos',
    component: () => import( '../views/OrthoGym/Servicos.vue')
  },
  {
    path: '/orthoGym/Sobre',
    name: 'OrthoGymSobre',
    component: () => import( '../views/OrthoGym/Sobre.vue')
  },
  {
    path: '/orthoGym/Contactos',
    name: 'OrthoGymContactos',
    component: () => import( '../views/OrthoGym/Contactos.vue')
  },

  // pagina nao encontrada
  {
    path: '/pagina-nao-encontrada',
    component: () => import( '../views/PaginaInexistente.vue')
  },
  { 
    path: '*',
    redirect: '/pagina-nao-encontrada' 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

export default router
