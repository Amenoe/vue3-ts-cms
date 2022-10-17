import { defineStore } from 'pinia'
import { getPageList } from '@/service/main/system/system'

const useInformationStore = defineStore('information', {
  state: (): {
    entireDepartment: any[]
    entireRole: any[]
  } => {
    return {
      entireDepartment: [],
      entireRole: []
    }
  },
  getters: {},
  actions: {
    async getInitDataAction() {
      //保存所有部门和角色的数据
      const { list: departmentList } = await getPageList('department/list', {
        offset: 0,
        size: 100
      })
      this.entireDepartment = departmentList
      const { list: roleList } = await getPageList('role/list', {
        offset: 0,
        size: 100
      })
      this.entireRole = roleList
    }
  }
})
export default useInformationStore
