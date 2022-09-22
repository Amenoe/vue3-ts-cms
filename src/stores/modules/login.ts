import { defineStore } from 'pinia'
import localCache from '@/utils/cache'
import { accountLogin, getUserInfo, getUserMenus } from '@/api/login/login'
import type { IAccount, IMenu } from '@/api/login/type'

import router from '@/router'
import { mapMenuToRoutes } from '@/utils/mapMenus'

const useLoginStore = defineStore('login', {
  state: (): {
    token: string
    userInfo: { name?: string }
    userMenus: IMenu[]
  } => {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  getters: {},
  actions: {
    async accountLoginAction(loginInfo: IAccount) {
      //1. 实现登录逻辑
      const loginResult = await accountLogin(loginInfo)
      console.log(loginResult)
      const { id, token } = loginResult.data
      //取出token并保存
      this.token = token
      localCache.setCache('token', token)

      //2. 请求用户信息并保存
      const userInfoResult = await getUserInfo(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo
      localCache.setCache('userInfo', userInfo)

      //3. 请求用户的菜单
      const userMenusResult = await getUserMenus(userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus
      localCache.setCache('userMenus', userMenus)
      this.addMenusToRoute()
      router.push('/main')
    },
    phoneLoginAction() {
      console.log()
    },

    //重新设置到pinia中
    loadLocalLogin() {
      const token = localCache.getCache('token')
      if (token) {
        this.token = token
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        this.userInfo = userInfo
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        console.log('生成userMenus')
        this.userMenus = userMenus
        this.addMenusToRoute()
      }
    },
    //生成用户路由表
    addMenusToRoute() {
      //根据权限动态生成路由表
      const routes = mapMenuToRoutes(this.userMenus)
      //将routes添加到main.children下
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    }
  }
})

export default useLoginStore
