import { defineStore } from 'pinia'
import { getPageList } from '@/service/main/system/system'

const useInformationStore = defineStore('information', {
  state: (): {
    entireDepartment: any[]
    entireRole: any[]
    entireMenu: any[]
  } => {
    return {
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  getters: {},
  actions: {
    async getInitDataAction() {
      //保存所有部门，角色，菜单的数据
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

      const { list: menuList } = await getPageList('menu/list', {})
      this.entireMenu = menuList
    }
  }
})
export default useInformationStore
