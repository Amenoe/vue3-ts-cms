import { defineStore } from 'pinia'
import { getPageList } from '@/service/main/system/system'
import type { IPageListPayload } from '../type'
//系统模块store
const useSystemStore = defineStore('system', {
  state: () => {
    return {
      usersList: [],
      usersTotalCount: 0,
      departmentList: [],
      departmentTotalCount: 0,
      roleList: [],
      roleTotalCount: 0,
      menuList: [],
      categoryList: [],
      categoryTotalCount: 0,
      goodsList: [],
      goodsTotalCount: 0,
      storyList: [],
      storyTotalCount: 0
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        const listData = (state as any)[`${pageName}List`] ?? []
        return listData
      }
    },
    pageListDataCount(state) {
      return (pageName: string) => {
        const listCount = (state as any)[`${pageName}TotalCount`] ?? 0
        return listCount
      }
    }
  },
  actions: {
    //页面发送请求
    async getPageListAction(payload: IPageListPayload) {
      const pageName = payload.pageName
      const pageResult = await getPageList(
        `${payload.pageName}/list`,
        payload.queryInfo
      )
      //保存数据到state中
      const { list, totalCount } = pageResult
      switch (pageName) {
        case 'users':
          this.usersList = list
          this.usersTotalCount = totalCount
          break
        case 'role':
          this.roleList = list
          this.roleTotalCount = totalCount
          break
      }
    }
  }
})
export default useSystemStore
