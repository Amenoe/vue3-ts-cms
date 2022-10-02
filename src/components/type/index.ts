type IFormType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  field: string
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: string | number
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

//navBreadcrumb
export interface IBreadcrumb {
  name: string
  path?: string
}

//page-table
export interface IPropListItem {
  prop?: string
  label: string
  minWidth?: string
  slotName?: string
}

/**
 * listData: 列表数据
 * propList: 每一列的数据
 * showIndexColumn: 显示列表序号
 * showSelectColumn: 显示列表多选框
 * title: 列表标题
 */
export interface IPageTable {
  listData: any
  propList: IPropListItem[]
  showIndexColumn: true
  showSelectColumn: false
  title: string
}
