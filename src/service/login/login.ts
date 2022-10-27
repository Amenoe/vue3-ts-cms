import request from '../index'

import type { Account, LoginInfo } from '../types'

enum LoginAPI {
  AccountLogin = '/login',
  UserInfo = '/users/',
  UserMenus = '/role/'
}

//用户登录
export function accountLoginRequest(account: Account) {
  return request.post<LoginInfo>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

//查询某个用户
export function getUserById(id: number) {
  return request.get({
    url: LoginAPI.UserInfo + id
  })
}

//高级查询，查询角色菜单树
//这里的id是权限id，和用户id不同
export function getUserMenus(id: number) {
  return request.get({
    url: LoginAPI.UserMenus + id + '/menu'
  })
}
