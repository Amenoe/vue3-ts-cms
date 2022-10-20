<template>
  <div class="page-dialog">
    <el-dialog
      :title="dialogTitle"
      width="30%"
      v-model="dialogVisible"
      center
      destroy-on-close
    >
      <Form v-bind="dialogFormConfig" v-model="formData" ref="formRef"></Form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import Form from '@/baseui/form/form.vue'
import useSystemStore from '@/stores/modules/system'
import type { ISearchForm } from '@/baseui/form/type'
import type { PropType } from 'vue'

const props = defineProps({
  dialogFormConfig: {
    type: Object as PropType<ISearchForm>,
    require: true
  },
  defaultInfo: {
    type: Object,
    default: () => ({})
  },
  dialogTitle: {
    type: String,
    default: ''
  },
  pageName: {
    type: String,
    required: true
  }
})

//用于接收Form组件回传的数据
const formData = ref<any>({})
//点击编辑显示时默认显示item的数据
watch(
  () => props.defaultInfo,
  (newValue) => {
    //只绑定dialog中有的数据，不然多余参数可能影响修改(比如updateAt就不能修改)
    for (const item of (props.dialogFormConfig as any).formItems) {
      formData.value[`${item.field}`] = newValue[`${item.field}`]
    }
    // formData.value = newValue
  }
)
const systemStore = useSystemStore()
//dialog
const dialogVisible = ref(false)

const formRef = ref<InstanceType<typeof Form>>()

const handleConfirmClick = () => {
  //调用表单验证
  formRef.value?.elFormRef?.validate((valid: boolean) => {
    if (valid) {
      //使用Object.keys将对象的key转为数组
      if (Object.keys(props.defaultInfo).length) {
        //编辑
        systemStore.editPageDataAction({
          pageName: props.pageName,
          editData: { ...formData.value },
          id: props.defaultInfo.id
        })
      } else {
        //新建
        systemStore.createPageDataAction({
          pageName: props.pageName,
          newData: { ...formData.value }
        })
      }
      dialogVisible.value = false
    } else {
      return false
    }
  })
}
defineExpose({
  dialogVisible
})
</script>

<style lang="less" scoped></style>
