import { defineStore } from 'pinia'
import { getPageListData } from '@/api/main/system/system'
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
      const pageResult = await getPageListData(
        payload.pageUrl,
        payload.queryInfo
      )
      console.log(pageResult)
    }
  }
})
export default useSystemStore
