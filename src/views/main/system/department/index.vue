<template>
  <div>
    <SearchForm
      :search-form-config="searchFormConfig"
      @reset-click="resetClick"
      @search-click="searchClick"
    >
    </SearchForm>
    <PageTable
      :page-table-config="pageTableConfig"
      :page-name="pageName"
      ref="pageTableRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    >
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
    </PageTable>
    <PageDialog
      :dialog-form-config="dialogFormConfigRef"
      :default-info="defaultInfo"
      :dialog-title="dialogTitle"
      :page-name="pageName"
      ref="pageDialogRef"
    ></PageDialog>
  </div>
</template>

<script setup lang="ts">
import type { ISearchForm } from '@/baseui/form/type'
import type { IPageTable } from '@/baseui/table/type'
import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageDialog } from '@/hooks/usePageDialog'
import useInformationStore from '@/stores/modules/information'
//搜索组件的配置
const searchFormConfig: ISearchForm = {
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

//列表的配置
const pageName = 'department'
const pageTableConfig: IPageTable = {
  title: '部门列表',
  propList: [
    { prop: 'name', label: '部门名称', minWidth: '100' },
    { prop: 'leader', label: '部门领导', minWidth: '100' },
    { prop: 'parentId', label: '上级部门', minWidth: '120' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '200',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '200',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '150', slotName: 'handler' }
  ],
  showIndexColumn: true
}

//对话框表单配置
const dialogTitle = ref('')
const dialogFormConfig: ISearchForm = {
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
      rules: [{ required: true }],
      options: []
    },
    {
      field: 'leader',
      label: '领导名称',
      type: 'input',
      placeholder: '请输入部门领导',
      rules: [{ required: true }]
    }
  ],
  colLayout: { span: 24 },
  itemStyle: { padding: '5px 0px' }
}

const informationStore = useInformationStore()

//如果网络请求在页面之后，使数据能够正常显示
const dialogFormConfigRef = computed(() => {
  //动态添加部门和角色列表
  const departmentItem = dialogFormConfig.formItems.find(
    (item) => item.field === 'parentId'
  )
  departmentItem!.options = informationStore.entireDepartment.map((item) => {
    return { label: item.name, value: item.id }
  })
  return dialogFormConfig
})

//dialog相关hook
const newCallBack = () => {
  dialogTitle.value = '新增部门'
}

const editCallBack = () => {
  dialogTitle.value = '新增部门'
}
//调用hooks中的公共函数
const { pageTableRef, resetClick, searchClick } = usePageSearch()
const { pageDialogRef, defaultInfo, handleNewClick, handleEditClick } =
  usePageDialog(newCallBack, editCallBack)
</script>

<style scoped lang="less"></style>
