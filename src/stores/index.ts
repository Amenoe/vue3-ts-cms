import { createPinia } from 'pinia'
import useLoginStore from './modules/login'
import useInformationStore from './modules/information'

const store = createPinia()

export function setupRouter() {
  useLoginStore().loadLocalLogin()
  useInformationStore().getInitDataAction()
}

export default store
