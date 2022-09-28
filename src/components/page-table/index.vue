<template>
  <div class="page-table">
    <el-table :data="listData" border style="width: 100%">
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { IPropList } from '../type'

defineProps({
  listData: {
    type: Array,
    required: true
  },
  propList: {
    type: Array as PropType<IPropList[]>,
    required: true
  }
})
</script>

<style scoped lang="less"></style>
