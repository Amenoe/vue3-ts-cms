//列表的配置
import type { IPageTable } from '@/baseui/table/type'

//列表的配置
export const pageTableConfig: IPageTable = {
  title: '菜单列表',
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: '100' },
    { prop: 'type', label: '类型', minWidth: '100' },
    { prop: 'icon', label: '图标', minWidth: '80', slotName: 'icon' },
    { prop: 'url', label: '组件路径', minWidth: '150' },
    { prop: 'permission', label: '按钮权限', minWidth: '150' },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '200',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '150', slotName: 'handler' }
  ],
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  },
  showIndexColumn: false,
  showSelectColumn: false,
  showFooter: false
}
