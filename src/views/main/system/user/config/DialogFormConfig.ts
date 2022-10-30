//对话框表单配置
import type { ISearchForm } from '@/baseui/form/type'

export const dialogFormConfig: ISearchForm = {
  formItems: [
    {
      field: 'name',
      label: '用户名',
      type: 'input',
      placeholder: '请输入用户名',
      rules: [
        {
          required: true,
          message: '用户名不能为空',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'realname',
      label: '真实姓名',
      type: 'input',
      placeholder: '请输入真实姓名',
      rules: [{ required: true, message: '姓名不能为空', trigger: 'blur' }]
    },
    {
      field: 'password',
      label: '密码',
      type: 'input',
      placeholder: '请输入密码',
      rules: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码',
      rules: [
        { required: true, message: '电话号码不能为空', trigger: 'blur' },
        {
          pattern: /^1[0-9]{10}$/,
          message: '请输入正确的手机号',
          trigger: 'change'
        }
      ],
      otherOptions: {
        maxlength: '11'
      }
    },
    {
      field: 'departmentId',
      type: 'select',
      label: '选择部门',
      placeholder: '请选择部门',
      rules: [{ required: true }],
      options: []
    },
    {
      field: 'roleId',
      type: 'select',
      label: '选择角色',
      placeholder: '请选择角色',
      rules: [{ required: true }],
      options: []
    }
  ],
  colLayout: { span: 24 },
  itemStyle: { padding: '5px 0px' }
}
