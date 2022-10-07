<template>
  <div class="role">
    <SearchForm :searchFormConfig="searchFormConfig"> </SearchForm>
    <PageTable :pageTableConfig="pageTableConfig" :pageName="pageName">
    </PageTable>
  </div>
</template>

<script setup lang="ts">
import type { ISearchForm } from '@/baseui/form/type'
import type { IPageTable } from '@/baseui/table/type'

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
    { prop: 'intro', label: '权限介绍', minWidth: '100' },

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
