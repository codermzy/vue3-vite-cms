import type { RouteRecordRaw } from 'vue-router'

import { createRouter, createWebHistory } from 'vue-router'

import localCache from '@/utils/cache'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/main',
    component: () => import('../view/main/main.vue'),
  },
  {
    path: '/login',
    component: () => import('../view/login/login.vue'),
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

router.beforeEach((to, from) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    console.log(token)
    if (!token) {
      return '/login'
    }
  }
})

export default router
