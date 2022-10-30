import type { ISearchForm } from '@/baseui/form/type'

export const searchFormConfig: ISearchForm = {
  formItems: [
    {
      field: 'name',
      label: '部门名称',
      type: 'input',
      placeholder: '请输入部门名称'
    },
    {
      field: 'leader',
      type: 'input',
      label: '部门领导',
      placeholder: '请输入部门领导'
    }
  ],
  labelWidth: '100px'
}
