<template>
  <el-card class="card">
    <template #header>
      <div class="card-header">
        <span class="card-header-title">{{ title }}</span>
        <slot name="header"></slot>
      </div>
    </template>
    <div class="card-content">
      <slot name="content"></slot>
    </div>
  </el-card>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<style lang="less" scoped>
.card {
  // :deep(.el-card__header) {
  //   padding: 10px 20px !important;
  // }

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-title {
      font-weight: 700;
    }
  }
  &-content {
    margin-bottom: 10px;
  }
}
</style>
