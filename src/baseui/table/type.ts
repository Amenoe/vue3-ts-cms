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
