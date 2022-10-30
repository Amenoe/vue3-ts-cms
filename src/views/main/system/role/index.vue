<template>
  <div class="role">
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
    </PageTable>
    <PageDialog
      :dialog-form-config="dialogFormConfig"
      :default-info="defaultInfo"
      :other-info="otherInfo"
      :dialog-title="dialogTitle"
      :page-name="pageName"
      ref="pageDialogRef"
    >
      <div class="menu-tree">
        <el-tree
          :data="menus"
          show-checkbox
          node-key="id"
          :props="defaultProps"
          :default-checked-keys="defaultCheckedKeys"
          @check="handleCheck"
        />
      </div>
    </PageDialog>
  </div>
</template>

<script setup lang="ts">
import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageDialog } from '@/hooks/usePageDialog'

import { searchFormConfig } from './config/SearchFormConfig'
import { pageTableConfig } from './config/PageTableConfig'
import { dialogFormConfig } from './config/DialogFormConfig'

import useInformationStore from '@/stores/modules/information'
import { getMenuLeafKeys } from '@/utils/map-menus'

const pageName = 'role'

const dialogTitle = ref('')

//dialog相关hook
const newCallBack = () => {
  dialogTitle.value = '新增角色'
  defaultCheckedKeys.value = []
}

const editCallBack = (item: any) => {
  dialogTitle.value = '编辑角色'
  const leafKeys = getMenuLeafKeys(item.menuList)
  ;(defaultCheckedKeys.value as any) = leafKeys
}

//对话框插槽
const informationStore = useInformationStore()

const menus = computed(() => informationStore.entireMenu)
const defaultProps = {
  children: 'children',
  label: 'name'
}

const otherInfo = ref({}) //除了form的其他表单数据
const defaultCheckedKeys = ref([]) //tree的默认选中

//第一个参数是tree的全部数组，第二个参数是数选中的对象
const handleCheck = (data1: any, data2: any) => {
  const checkedKeys = data2.checkedKeys //选中键数组
  const halfCheckedKeys = data2.halfCheckedKeys //半选中键数组
  const menuList = [...checkedKeys, ...halfCheckedKeys]
  otherInfo.value = { menuList }
}

//调用hooks中的公共函数并传入两个函数
const { pageTableRef, resetClick, searchClick } = usePageSearch()
const { pageDialogRef, defaultInfo, handleNewClick, handleEditClick } =
  usePageDialog(newCallBack, editCallBack)
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 10%;
}
</style>
