<template>
  <div class="page-dialog">
    <el-dialog
      title="新建用户"
      width="30%"
      v-model="dialogVisible"
      center
      destroy-on-close
    >
      <Form v-bind="dialogForm" v-model="formData"></Form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleNewData">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import Form from '@/baseui/form/form.vue'
import type { ISearchForm } from '@/baseui/form/type'
import type { PropType } from 'vue'

const props = defineProps({
  dialogForm: {
    type: Object as PropType<ISearchForm>,
    require: true
  },
  defaultInfo: {
    type: Object,
    default: () => ({})
  }
})
//用于接收Form组件回传的数据
const formData = ref<any>({})
//点击编辑显示时默认显示item的数据
watch(
  () => props.defaultInfo,
  (newValue) => {
    // for (const item of props.dialogForm.formItems) {
    //   formData.value[`${item.field}`] = newValue[`${item.field}`]
    // }
    formData.value = newValue
  }
)

//dialog
const dialogVisible = ref(false)
const handleNewData = () => {
  console.log(formData.value)
}

defineExpose({
  dialogVisible
})
</script>

<style lang="less" scoped></style>
