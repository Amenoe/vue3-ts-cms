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

//总的数据类型
export interface IDataType<T = any> {
  code: number
  data: T
}
