import { createRouter, createWebHistory } from 'vue-router'
import localCache from '@/utils/cache'
import { firstRoute } from '@/utils/map-menus'
import type { RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/LoginView.vue') //路由懒加载
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/MainView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/error/404.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes
})

//导航拦截
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
  if (to.path === '/main') {
    console.log(firstRoute)
    return firstRoute?.path
  }
})

export default router
