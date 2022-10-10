//page-table
export interface IPropListItem {
  prop?: string
  label: string
  minWidth?: string
  slotName?: string
}

/**
 * title: 列表标题
 * propList: 每一列的数据
 * showIndexColumn: 显示列表序号
 * showSelectColumn: 显示列表多选框
 * childrenProps: 用于菜单页面可展开的表格
 */
export interface IPageTable {
  title: string
  propList: IPropListItem[]
  showIndexColumn?: boolean
  showSelectColumn?: boolean
  showFooter?: boolean
  childrenProps?: { rowKey: string; treeProp: object }
}
