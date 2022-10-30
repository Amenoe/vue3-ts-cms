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

import { pageTableConfig } from './config/PageTableConfig'

//列表的配置
const pageName = 'menu'
</script>

<style scoped lang="less"></style>
