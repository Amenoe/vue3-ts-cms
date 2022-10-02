<template>
  <div class="page-table">
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
        <el-table-column v-bind="propItem" align="center">
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop as string] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <slot name="footer">
        <el-pagination
          :page-sizes="[100, 200, 300, 400]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { IPropListItem } from '../type'

defineProps({
  title: {
    type: String,
    default: ''
  },
  listData: {
    type: Array,
    required: true
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
  }
})
//定义发出事件
const emit = defineEmits(['tableSelect'])

const handleTableSelect = (selection: any) => {
  emit('tableSelect', selection)
}
</script>

<style scoped lang="less">
.page-table {
  background-color: #fff;
  border: 6px;
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
    padding: 12px 22px;
  }
}
</style>
