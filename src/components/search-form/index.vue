<template>
  <div class="search-form">
    <Form v-bind="searchFormConfig" v-model="formData">
      <template #footer>
        <div class="search-footer">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="handleSearchClick"
            >搜索</el-button
          >
          <el-button icon="el-icon-refresh" @click="handleResetClick"
            >重置</el-button
          >
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
//动态获取回传数据的属性
const originFormData: any = {}
const formItems = props.searchFormConfig.formItems ?? []
for (const formItem of formItems) {
  originFormData[formItem.field] = ''
}
const formData = ref({ ...originFormData })

const emit = defineEmits(['resetClick', 'searchClick'])

//点击重置
const handleResetClick = () => {
  // formData.value = originFormData
  //通过修改对象内的值，直接影响子组件(子组件中使用浅拷贝所以是同一个对象)
  for (const key in originFormData) {
    formData.value[key] = originFormData[key]
  }
  emit('resetClick')
}

//点击搜索
const handleSearchClick = () => {
  emit('searchClick', formData.value)
}
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
