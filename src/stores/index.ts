import { createPinia } from 'pinia'
import useLoginStore from './modules/login'

const store = createPinia()

export function setupRouter() {
  useLoginStore().loadLocalLogin()
}

export default store
