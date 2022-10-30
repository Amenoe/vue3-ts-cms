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
import { searchFormConfig } from './config/SearchFormConfig'
import { pageTableConfig } from './config/PageTableConfig'
import { dialogFormConfig } from './config/DialogFormConfig'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageDialog } from '@/hooks/usePageDialog'
import useInformationStore from '@/stores/modules/information'
//搜索组件的配置

//列表的配置
const pageName = 'department'

//对话框表单配置
const dialogTitle = ref('')

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
