type IFormType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  field: string
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: string
  //针对select
  options?: any[]
  //针对特殊的属性
  otherOptions?: object
}

export interface ISearchForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: object
  itemStyle?: object
}
