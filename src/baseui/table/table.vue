<template>
  <div class="table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"> </slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      stripe
      style="width: 100%"
      @select="handleTableSelect"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="80"
      >
      </el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        align="center"
        label="序号"
        width="80"
      >
      </el-table-column>

      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop as string] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          v-model:currentPage="currentPage"
          v-model:pageSize="pageSize"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
        />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { IPropListItem } from './/type'

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  listData: {
    type: Array,
    required: true
  },
  listCount: {
    type: Number,
    default: 0
  },
  propList: {
    type: Array as PropType<IPropListItem[]>,
    required: true
  },
  showIndexColumn: {
    type: Boolean,
    default: false
  },
  showSelectColumn: {
    type: Boolean,
    default: false
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  //分页器数据
  page: {
    type: Object,
    default: () => ({ currentPage: 1, pageSize: 10 })
  },
  childrenProps: {
    type: Object,
    default: () => ({})
  }
})

//定义发出事件
const emit = defineEmits(['tableSelect', 'update:page'])

//分页器
const pageSize = ref(props.page.pageSize)
const currentPage = ref(props.page.currentPage)

//通过watch监听分页器数据的变化
watch([pageSize, currentPage], ([pageSize, currentPage]) => {
  emit('update:page', { ...props.page, pageSize, currentPage })
})

// const handleSizeChange = (pageSize: number) => {
//   emit('update:page', { ...props.page, pageSize })
// }
// const handleCurrentChange = (currentPage: number) => {
//   emit('update:page', { ...props.page, currentPage })
// }
const handleTableSelect = (selection: any) => {
  emit('tableSelect', selection)
}
</script>

<style scoped lang="less">
.table {
  background-color: #fff;
  padding: 6px 0px;
  border-radius: 6px;

  .header {
    display: flex;
    height: 45px;
    padding: 12px 22px;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 20px;
      font-weight: 700;
    }
  }
  .footer {
    display: flex;
    flex-direction: row;
    justify-content: right;
    padding: 12px 22px 6px; //上 左右 下
  }
}
</style>
