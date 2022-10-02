<template>
  <div class="user">
    <SearchForm :searchFormConfig="searchFormConfig"> </SearchForm>
    <PageTable :pageTableConfig="pageTableConfig" pageName="user"> </PageTable>
  </div>
</template>

<script setup lang="ts">
import type { ISearchForm } from '@/baseui/form/type'
import type { IPageTable } from '@/baseui/table/type'
import useSystemStore from '@/stores/modules/system'

//store
const systemStore = useSystemStore()
systemStore.getPageListAction({
  pageUrl: 'users/list',
  queryInfo: {
    offset: 0,
    size: 10
  }
})
const userList = computed(() => systemStore.userList)
const userCount = computed(() => systemStore.userCount)

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
      label: '用户名',
      type: 'input',
      placeholder: '请输入用户名'
    },
    {
      field: 'password',
      label: '密码',
      type: 'password',
      placeholder: '请输入密码'
    },
    {
      field: 'sport',
      label: '喜欢的运动',
      type: 'select',
      placeholder: '请选择喜欢的运动',
      options: [
        { label: '跑步', value: 'runing' },
        { label: '足球', value: 'football' }
      ]
    },
    {
      field: 'createTime',
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
const pageTableConfig: IPageTable = {
  title: '用户列表',
  listData: userList.value,
  propList: [
    { prop: 'name', label: '用户名', minWidth: '100' },
    { prop: 'realname', label: '姓名', minWidth: '100' },
    { prop: 'cellphone', label: '手机号', minWidth: '120' },
    { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
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
</script>

<style scoped lang="less"></style>
