import type { DefineComponent } from 'vue'

export interface IAccount {
  name: string
  password: string
}
//登录结果的类型
export interface ILoginResult {
  id: number
  name: string
  token: string
}

//用户信息的类型 如果太复杂可以直接用any

//子菜单的类型
export interface IMenuChild {
  id: number
  url: string
  name: string
  sort: number
  type: number
  children?: any
  parentId: number
}
//用户菜单的类型
export interface IMenu {
  id: number
  name: string
  type: number
  url: string
  icon: string
  sort: number
  children: IMenuChild[]
}

//总的数据类型
export interface IDataType<T = any> {
  code: number
  data: T
}
