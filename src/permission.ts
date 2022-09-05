import router from './router'
import useLoginStore from './stores/modules/login'
import localCache from '@/utils/cache'

//导航拦截
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    } else {
      useLoginStore().loadLocalLogin()
    }
  }
})
