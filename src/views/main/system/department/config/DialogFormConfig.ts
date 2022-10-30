//对话框表单配置
import type { ISearchForm } from '@/baseui/form/type'

export const dialogFormConfig: ISearchForm = {
  formItems: [
    {
      field: 'name',
      label: '部门名称',
      type: 'input',
      placeholder: '请输入部门名称',
      rules: [
        {
          required: true,
          message: '部门名称不能为空',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'parentId',
      type: 'select',
      label: '上级部门',
      placeholder: '请选择上级部门',
      rules: [{ required: true, message: '部门名称不能为空' }],
      options: []
    },
    {
      field: 'leader',
      label: '领导名称',
      type: 'input',
      placeholder: '请输入部门领导',
      rules: [{ required: true, message: '领名称不能为空', trigger: 'blur' }]
    }
  ],
  colLayout: { span: 24 },
  itemStyle: { padding: '5px 0px' }
}
