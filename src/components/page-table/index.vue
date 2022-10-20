<template>
  <div class="page-table">
    <ContentTable
      :listData="dataList"
      :listCount="dataCount"
      v-bind="pageTableConfig"
      @tableSelect="tableSelect"
      v-model:page="pageInfo"
    >
      <!-- header中的插槽 -->
      <template #headerHandler>
        <el-button
          v-if="isCreate"
          plain
          @click="handleNewClick"
          type="primary"
          icon="el-icon-plus"
        >
          新增
        </el-button>
        <el-button plain @click="handleRefresh" icon="el-icon-refresh"
          >刷新</el-button
        >
      </template>
      <!-- 列中的插槽 -->
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handle-btn">
          <el-button
            v-if="isUpdate"
            icon="el-icon-edit"
            size="small"
            type="primary"
            link
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-if="isDelete"
            icon="el-icon-delete"
            size="small"
            type="primary"
            link
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 页面传过来的剩余插槽 -->
      <template
        v-for="item in pagePropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </ContentTable>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import ContentTable from '@/baseui/table/table.vue'
import type { IPageTable } from '@/baseui/table/type'
import useSystemStore from '@/stores/modules/system'
import { usePermission } from '@/hooks/usePermission'
import { useMessageBox } from '@/hooks/useMessageBox'

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

//第一次计算可能为空，但是当网络请求后数据发生改变又会再计算一次
const dataList = computed(() => systemStore.pageListData(props.pageName))
const dataCount = computed(() => systemStore.pageListDataCount(props.pageName))
const pageInfo = ref({ currentPage: 1, pageSize: 10 })

//判断用户的按钮权限
const isCreate = usePermission(props.pageName, 'create')
const isUpdate = usePermission(props.pageName, 'update')
const isDelete = usePermission(props.pageName, 'delete')
const isQuery = usePermission(props.pageName, 'query')

//调用pinia中的网络请求
const getPageData = (queryInfo: any = {}) => {
  if (!isQuery) return
  systemStore.getPageListAction({
    // pageUrl: 'users/list',
    pageName: props.pageName,
    queryInfo: {
      offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
      size: pageInfo.value.pageSize,
      ...queryInfo //拼接查询条件,可以是数据中的任意值
    }
  })
}
getPageData() //首次调用

//侦听分页器的数据改变，调用网络请求
watch(pageInfo, () => {
  getPageData()
})

//获取页面相关的动态插槽名(过滤公共的插槽)
const pagePropSlots: any = props.pageTableConfig.propList.filter((item) => {
  if (item.slotName === 'createAt') return false
  if (item.slotName === 'updateAt') return false
  if (item.slotName === 'handler') return false
  return true
})

const emits = defineEmits(['NewClick', 'EditClick'])
//处理列表多选框返回的数据
const tableSelect = (selection: any) => {
  console.log(selection)
}

const handleNewClick = () => {
  emits('NewClick')
}
const handleRefresh = () => {
  getPageData()
  ElMessage.success('刷新成功')
}

const handleEditClick = (item: any) => {
  emits('EditClick', item)
}
//点击删除
const handleDeleteClick = (item: any) => {
  useMessageBox('确定要删除该用户吗', '警告').then(() => {
    systemStore.deletePageDataAction({
      pageName: props.pageName,
      id: item.id
    })
  })
}
defineExpose({
  getPageData
})
</script>

<style scoped lang="less">
.page-table {
  padding: 12px;

  .handle-btn .el-button {
    margin-left: 6px;
  }
}
</style>
