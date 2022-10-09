<template>
  <div class="goods">
    <PageTable :page-table-config="pageTableConfig" :page-name="pageName">
      <!-- 页面的插槽 -->
      <template #image="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          fit="cover"
          preview-teleported
          hide-on-click-modal
        >
        </el-image>
      </template>

      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.status === 1 ? 'success' : 'danger'"
          >{{ scope.row.status === 1 ? '启用' : '禁用' }}</el-button
        >
      </template>
    </PageTable>
  </div>
</template>

<script setup lang="ts">
import type { IPageTable } from '@/baseui/table/type'
import PageTable from '@/components/page-table/index.vue'
//列表的配置
const pageName = 'goods'
const pageTableConfig: IPageTable = {
  title: '商品列表',
  propList: [
    { prop: 'name', label: '商品名', minWidth: '80' },
    { prop: 'desc', label: '商品描述', minWidth: '100' },
    { prop: 'address', label: '产地', minWidth: '80' },
    { prop: 'imgUrl', label: '商品图片', minWidth: '100', slotName: 'image' },
    { prop: 'status', label: '上架状态', minWidth: '80', slotName: 'status' },
    {
      prop: 'newPrice',
      label: '商品现价',
      minWidth: '100'
    },
    {
      prop: 'oldPrice',
      label: '商品原价',
      minWidth: '100'
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
