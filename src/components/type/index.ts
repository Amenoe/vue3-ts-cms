type IFormType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: string | number
  //针对select
  options?: any[]
  //针对特殊的属性
  otherOptions?: object
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: object
  itemStyle?: object
}

//navBreadcrumb
export interface IBreadcrumb {
  name: string
  path?: string
}