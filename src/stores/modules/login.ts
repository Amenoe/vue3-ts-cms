import { defineStore } from 'pinia'
import localCache from '@/utils/cache'
import { accountLogin, getUserInfo, getUserMenu } from '@/api/login/login'
import type { IAccount, IMenu } from '@/api/login/type'

import router from '@/router'

const useLoginStore = defineStore('login', {
  state: (): {
    token: string
    userInfo: { name?: string }
    userMenu: IMenu[]
  } => {
    return {
      token: '',
      userInfo: {},
      userMenu: []
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
      const userMenuResult = await getUserMenu(userInfo.role.id)
      const userMenu = userMenuResult.data
      this.userMenu = userMenu
      localCache.setCache('userMenu', userMenu)
      //跳转到登录页
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
      const userMenu = localCache.getCache('userMenu')
      if (userMenu) {
        this.userMenu = userMenu
      }
    }
  }
})

export default useLoginStore
