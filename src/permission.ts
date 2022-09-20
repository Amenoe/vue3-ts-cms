import router from './router'
import useLoginStore from './stores/modules/login'
import localCache from '@/utils/cache'
import { mapMenuToRoutes } from '@/utils/mapMenus'
import { firstMenu } from '@/utils/mapMenus'

//导航拦截
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    } else {
      //重新加载pinia中的数据
      if (useLoginStore().token === '') {
        useLoginStore().loadLocalLogin()
      }
    }
  }
  if (to.path === '/main') {
    return firstMenu.url
  }
})

export function setupRouter() {
  useLoginStore().loadLocalLogin()
  //根据权限动态生成路由表
  const routes = mapMenuToRoutes(useLoginStore().userMenu)
  //将routes添加到main.children下
  routes.forEach((route) => {
    router.addRoute('main', route)
  })
}
