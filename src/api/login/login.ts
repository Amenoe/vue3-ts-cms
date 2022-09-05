import request from '..'

import type { IAccount, IDataType, ILoginResult } from './type'

//账号登录
export function accountLogin(account: IAccount) {
  return request.request<IDataType<ILoginResult>>({
    method: 'post',
    url: '/login',
    data: account
  })
}

//获取用户信息
export function getUserInfo(id: number) {
  return request.request<IDataType>({
    method: 'get',
    url: `/users/${id}`,
    showLoading: false
  })
}

//获取用户菜单
export function getUserMenu(id: number) {
  return request.request<IDataType>({
    method: 'get',
    url: `/role/${id}/menu`,
    showLoading: false
  })
}
