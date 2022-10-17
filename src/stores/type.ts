export interface IGetPageListPayload {
  pageName: string
  queryInfo: any
}

export interface IDeletePageDataPayload {
  pageName: string
  id: string
}

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
  parentId: number
  permission?: string
  children?: any
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
