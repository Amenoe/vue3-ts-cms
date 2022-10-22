<template>
  <div class="menu">
    <PageTable
      :page-table-config="pageTableConfig"
      :page-name="pageName"
      ref="pageTableRef"
    >
      <template #type="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.type === 1 ? 'success' : 'danger'"
          >{{ scope.row.type === 1 ? '启用' : '禁用' }}</el-button
        >
      </template>

      <template #icon="scope">
        <el-icon :size="20">
          <component :is="scope.row.icon"></component>
        </el-icon>
      </template>
    </PageTable>
  </div>
</template>

<script setup lang="ts">
import PageTable from '@/components/page-table/index.vue'

import type { IPageTable } from '@/baseui/table/type'

//列表的配置
const pageName = 'menu'
const pageTableConfig: IPageTable = {
  title: '菜单列表',
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: '100' },
    { prop: 'type', label: '类型', minWidth: '100' },
    { prop: 'icon', label: '图标', minWidth: '80', slotName: 'icon' },
    { prop: 'url', label: '组件路径', minWidth: '150' },
    { prop: 'permission', label: '按钮权限', minWidth: '150' },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '200',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '150', slotName: 'handler' }
  ],
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  },
  showIndexColumn: false,
  showSelectColumn: false,
  showFooter: false
}
</script>

<style scoped lang="less"></style>
