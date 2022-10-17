import type PageDialog from '@/components/page-dialog/index.vue'

type CallBackFn = () => void

export function usePageDialog(
  newCallBack?: CallBackFn,
  editCallBack?: CallBackFn
) {
  //dialog组件实例
  const pageDialogRef = ref<InstanceType<typeof PageDialog>>()
  //默认的dialog数据
  const defaultInfo = ref({})

  //新增事件和编辑事件
  const handleNewClick = () => {
    defaultInfo.value = {}
    if (pageDialogRef.value) {
      pageDialogRef.value.dialogVisible = true
    }
    newCallBack && newCallBack() //有值执行
  }

  const handleEditClick = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageDialogRef.value) {
      pageDialogRef.value.dialogVisible = true
    }
    editCallBack && editCallBack()
  }
  return { pageDialogRef, defaultInfo, handleNewClick, handleEditClick }
}
