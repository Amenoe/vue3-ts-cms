import { defineStore } from 'pinia'
import localCache from '@/utils/cache'
import {
  accountLoginRequest,
  getUserById,
  getUserMenus
} from '@/service/login/login'
import type { IAccount, IMenu } from '../type'
import router from '@/router'

import { mapMenuToRoutes, mapMenuToPermissions } from '@/utils/map-menus'

const useLoginStore = defineStore('login', {
  state: (): {
    token: string
    userInfo: { name?: string }
    userMenus: IMenu[]
    permissions: string[]
  } => {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  actions: {
    async accountLoginRequestAction(loginInfo: IAccount) {
      //1. 实现登录逻辑
      const loginResult = await accountLoginRequest(loginInfo)
      const { id, token } = loginResult
      //取出token并保存
      this.token = token
      localCache.setCache('token', token)

      //2. 请求用户信息并保存
      const userInfoResult = await getUserById(id)
      const userInfo = userInfoResult
      this.userInfo = userInfo
      localCache.setCache('userInfo', userInfo)

      //3. 请求用户的菜单
      const userMenusResult = await getUserMenus(userInfo.role.id)
      const userMenus = userMenusResult
      this.userMenus = userMenus
      localCache.setCache('userMenus', userMenus)
      //登录请求时生成路由表和按钮权限
      this.addMenusToRoute(userMenus)
      this.getUserPermission(userMenus)
    },
    phoneLoginAction() {
      console.log('电话登录')
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
        this.userMenus = userMenus
        //每次刷新时生成路由表和按钮权限
        this.addMenusToRoute(userMenus)
        this.getUserPermission(userMenus)
      }
    },
    //生成用户路由表
    addMenusToRoute(userMenus: any[]) {
      //根据权限动态生成路由表
      const routes = mapMenuToRoutes(userMenus)
      //将routes添加到main.children下
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
    },
    //判断用户按钮权限
    getUserPermission(userMenus: any[]) {
      this.permissions = mapMenuToPermissions(userMenus)
    }
  }
})

export default useLoginStore
