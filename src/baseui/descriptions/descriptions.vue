<template>
  <div class="descriptions">
    <el-descriptions class="margin-top" :title="title" :column="column" border>
      <template v-for="item in dependencies" :key="item.name">
        <el-descriptions-item>
          <template #label> {{ item.name }} </template>
          <el-tag size="small">{{ item.description }}</el-tag>
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

interface dependencieType {
  name: string
  description: string
}

defineProps({
  title: {
    type: String,
    default: ''
  },
  dependencies: {
    type: Array as PropType<dependencieType[]>,
    default: () => []
  },
  column: {
    type: Number,
    default: 1
  }
})
</script>

<style lang="less" scoped></style>
