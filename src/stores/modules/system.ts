import { defineStore } from 'pinia'
import { deletePageData, getPageList } from '@/service/main/system/system'
import type { IDeletePageDataPayload, IGetPageListPayload } from '../type'
//系统模块store,还包括了故事和商品信息
const useSystemStore = defineStore('system', {
  state: () => {
    return {
      usersList: [{}],
      usersTotalCount: 0,
      departmentList: [{}],
      departmentTotalCount: 0,
      roleList: [{}],
      roleTotalCount: 0,
      menuList: [{}],
      categoryList: [{}],
      categoryTotalCount: 0,
      goodsList: [{}],
      goodsTotalCount: 0,
      storyList: [{}],
      storyTotalCount: 0
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        const listData = (state as any)[`${pageName}List`] ?? []
        console.log(listData)
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
    //获取页面数据
    async getPageListAction(payload: IGetPageListPayload) {
      const { pageName, queryInfo } = payload
      //发送网络请求
      const pageResult = await getPageList(`${pageName}/list`, queryInfo)
      console.log(pageResult)
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
        case 'menu':
          this.menuList = list
          break
        case 'goods':
          this.goodsList = list
          this.goodsTotalCount = totalCount
          break
      }
    },

    async deletePageDataAction(payload: IDeletePageDataPayload) {
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      //发送删除的网络请求
      await deletePageData(pageUrl)
      //重新请求数据
      this.getPageListAction({
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
})
export default useSystemStore
