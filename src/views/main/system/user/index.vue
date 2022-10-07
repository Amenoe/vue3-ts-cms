<template>
  <div class="user">
    <SearchForm
      :searchFormConfig="searchFormConfig"
      @resetClick="resetClick"
      @searchClick="searchClick"
    >
    </SearchForm>
    <PageTable
      :pageTableConfig="pageTableConfig"
      :pageName="pageName"
      ref="pageTableRef"
    >
    </PageTable>
  </div>
</template>

<script setup lang="ts">
import SearchForm from '@/components/search-form/index.vue'
import PageTable from '@/components/page-table/index.vue'
import type { ISearchForm } from '@/baseui/form/type'
import type { IPageTable } from '@/baseui/table/type'

import { usePageSearch } from '@/hooks/usePageSearch'

//搜索组件的配置
const searchFormConfig: ISearchForm = {
  formItems: [
    {
      field: 'name',
      label: '用户名',
      type: 'input',
      placeholder: '请输入用户名'
    },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名'
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码',
      placeholder: '请输入电话号码'
    },
    {
      field: 'enable',
      type: 'select',
      label: '用户状态',
      placeholder: '请选择用户状态',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
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
const pageName = 'users'
const pageTableConfig: IPageTable = {
  title: '用户列表',
  propList: [
    { prop: 'name', label: '用户名', minWidth: '100' },
    { prop: 'realname', label: '真实姓名', minWidth: '100' },
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

const { pageTableRef, resetClick, searchClick } = usePageSearch()
</script>

<style scoped lang="less"></style>
