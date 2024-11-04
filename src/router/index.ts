import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'PayForm', component: () => import('@/views/PayFormPage.vue') },
  { path: '/post', name: 'RequestShow', component: () => import('@/views/RequestShowPage.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
