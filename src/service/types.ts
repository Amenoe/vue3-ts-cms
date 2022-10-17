export interface Account {
  name: string
  password: string
}

export interface LoginInfo {
  id: number
  token: string
  name: string
}

export interface IDataType {
  list: any[]
  totalCount: number
}
