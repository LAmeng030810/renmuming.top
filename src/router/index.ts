import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('@/pages/Home/index.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
