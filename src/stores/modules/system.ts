import { defineStore } from 'pinia'
import { getPageList } from '@/service/main/system/system'
import type { IPageListPayload } from '../type'
//系统模块store
const useSystemStore = defineStore('system', {
  state: () => {
    return {
      userList: [],
      userCount: []
    }
  },
  getters: {},
  actions: {
    //页面发送请求
    async getPageListAction(payload: IPageListPayload) {
      const pageResult = await getPageList(payload.pageUrl, payload.queryInfo)
      console.log(pageResult)
      const { list, totalCount } = pageResult
      this.userList = list
      this.userCount = totalCount
    }
  }
})
export default useSystemStore
