import { defineStore } from 'pinia'

export const useStore = defineStore('counter', {
  state: () => {
    return { count: 0, token: '12o3ngo23okdwkf12' }
  },
  // 也可以定义为
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++
    }
  }
})
