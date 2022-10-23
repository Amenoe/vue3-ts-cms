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
import type { ISearchForm } from '@/baseui/form/type'
import type { IPageTable } from '@/baseui/table/type'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageDialog } from '@/hooks/usePageDialog'

import useInformationStore from '@/stores/modules/information'
import { getMenuLeafKeys } from '@/utils/map-menus'

//搜索组件的配置
const searchFormConfig: ISearchForm = {
  formItems: [
    {
      field: 'id',
      label: 'id',
      type: 'input',
      placeholder: '请输入id'
    },
    {
      field: 'name',
      label: '角色名称',
      type: 'input',
      placeholder: '请输入用户名'
    },
    {
      field: 'createAt',
      label: '创建时间',
      type: 'datepicker',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ],
  labelWidth: '100px'
}

//列表的配置
const pageName = 'role'
const pageTableConfig: IPageTable = {
  title: '角色列表',
  propList: [
    { prop: 'name', label: '角色名', minWidth: '100' },
    { prop: 'intro', label: '角色描述', minWidth: '100' },

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
  showIndexColumn: true,
  showSelectColumn: false
}

//对话框表单配置
const dialogTitle = ref('')
const dialogFormConfig: ISearchForm = {
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

//dialog相关hook
const newCallBack = () => {
  dialogTitle.value = '新增角色'
}

const editCallBack = (item: any) => {
  dialogTitle.value = '编辑角色'
  const leafKeys = getMenuLeafKeys(item.menuList)
  console.log(leafKeys)
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
