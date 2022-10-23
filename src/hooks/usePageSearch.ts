import type PageTable from '@/components/page-table/index.vue'

export function usePageSearch() {
  //pageTable组件实例对象
  const pageTableRef = ref<InstanceType<typeof PageTable>>()

  //处理子组件的重置和搜索事件
  const resetClick = () => {
    pageTableRef.value?.getPageData({})
  }
  const searchClick = (queryInfo: any) => {
    pageTableRef.value?.getPageData(queryInfo)
  }

  return { pageTableRef, resetClick, searchClick }
}
