<template>
  <div class="search-form">
    <Form v-bind="searchFormConfig" v-model="formData">
      <template #footer>
        <div class="search-footer">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
          <el-button icon="el-icon-refresh">重置</el-button>
        </div>
      </template></Form
    >
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { ISearchForm } from '@/baseui/form/type'
import Form from '../../baseui/form/form.vue'

const props = defineProps({
  searchFormConfig: {
    type: Object as PropType<ISearchForm>,
    required: true
  },
  title: {
    type: String,
    default: '高级检索'
  }
})
interface IFormData {
  [key: string]: any
}
//获取回传数据的属性
const originFormData: IFormData = {}
const formItems = props.searchFormConfig.formItems ?? []
for (const formItem of formItems) {
  originFormData[`${formItem.field}`] = ''
}
const formData = ref<IFormData>({ ...originFormData })
</script>

<style lang="less" scoped>
.search-form {
  padding: 12px;
  .search-footer {
    text-align: right;
    margin-right: 40px;
  }
}
</style>
