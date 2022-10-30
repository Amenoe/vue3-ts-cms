//对话框表单配置
import type { ISearchForm } from '@/baseui/form/type'

export const dialogFormConfig: ISearchForm = {
  formItems: [
    {
      field: 'name',
      label: '角色名称',
      type: 'input',
      placeholder: '请输入角色名称',
      rules: [
        {
          required: true,
          message: '角色名不能为空',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'intro',
      label: '角色描述',
      type: 'input',
      placeholder: '请输入角色描述'
    }
    //TODO 添加权限分配
  ],
  colLayout: { span: 24 },
  itemStyle: { padding: '5px 0px' }
}
