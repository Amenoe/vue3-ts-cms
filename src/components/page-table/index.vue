<template>
  <div class="page-table">
    <ContentTable
      :listData="dataList"
      v-bind="pageTableConfig"
      @tableSelect="tableSelect"
    >
      <!-- header中的插槽 -->
      <template #headerHandler>
        <el-button
          plain
          @click="handlerNewUser"
          type="primary"
          icon="el-icon-plus"
          >新增</el-button
        >
        <el-button plain @click="handlerRefresh" icon="el-icon-refresh"
          >刷新</el-button
        >
      </template>
      <!-- 列中的插槽 -->
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler>
        <div class="handle-btn">
          <el-button icon="el-icon-edit" size="small" type="text"
            >编辑</el-button
          >
          <el-button icon="el-icon-delete" size="small" type="text"
            >删除</el-button
          >
        </div>
      </template>
    </ContentTable>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import ContentTable from '@/baseui/table/table.vue'
import type { IPageTable } from '@/baseui/table/type'
import useSystemStore from '@/stores/modules/system'

const props = defineProps({
  pageTableConfig: {
    type: Object as PropType<IPageTable>,
    required: true
  },
  pageName: {
    type: String,
    required: true
  }
})

//store
const systemStore = useSystemStore()
//发送网络请求
systemStore.getPageListAction({
  // pageUrl: 'users/list',
  pageName: props.pageName,
  queryInfo: {
    offset: 0,
    size: 10
  }
})
const dataList = computed(() => systemStore.pageListData(props.pageName))

//处理列表子组件返回的数据
const tableSelect = (selection: any) => {
  console.log(selection)
}
//新建用户
const handlerNewUser = () => {
  console.log('click new user')
}
//刷新列表
const handlerRefresh = () => {
  console.log('click refresh')
}
</script>

<style scoped lang="less">
.page-table {
  padding: 12px;

  .handle-btn .el-button {
    margin-left: 0px;
  }
}
</style>
